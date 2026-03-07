// Basic Swagger generator for Express routers and Mongoose models
// Scans routes and controllers to produce an OpenAPI 3.0 JSON
// Usage: node scripts/generateSwagger.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ROUTES_DIR = path.join(ROOT, 'routes');
const CONTROLLERS_DIR = path.join(ROOT, 'controllers');
const MODELS_DIR = path.join(ROOT, 'models');
const SERVER_FILE = path.join(ROOT, 'server.js');
const OUTPUT_FILE = path.join(ROOT, 'swagger.json');

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

function listFilesRecursive(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

// Parse server.js to map import variable -> route file path and mount base
function parseServerMounts() {
  const src = readFileSafe(SERVER_FILE);
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"](\.\/routes\/[^'"]+)['"]/g;
  const mountsRegex = /app\.use\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z0-9_]+)\s*\)/g;
  const importMap = new Map(); // var -> file
  let m;
  while ((m = importRegex.exec(src))) {
    importMap.set(m[1], path.join(ROOT, m[2]));
  }
  const mounts = []; // { base, var, file }
  while ((m = mountsRegex.exec(src))) {
    const base = m[1];
    const v = m[2];
    const file = importMap.get(v);
    if (file) mounts.push({ base, var: v, file });
  }
  return mounts;
}

// Parse index.js aggregator to map subpath -> file
function parseAggregator(aggregatorFile) {
  const src = readFileSafe(aggregatorFile);
  if (!src) return [];
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"](\.\/[^'"]+)['"]/g;
  const useRegex = /router\.use\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z0-9_]+)\s*\)/g;
  const importMap = new Map();
  let m;
  const baseDir = path.dirname(aggregatorFile);
  while ((m = importRegex.exec(src))) {
    importMap.set(m[1], path.join(baseDir, m[2]));
  }
  const routes = [];
  while ((m = useRegex.exec(src))) {
    const subpath = m[1];
    const v = m[2];
    const file = importMap.get(v);
    if (file) routes.push({ subpath, file });
  }
  return routes;
}

// Parse a router file for method/path pairs and collect potential controller file
function parseRouterFile(routerFile) {
  const src = readFileSafe(routerFile);
  const baseDir = path.dirname(routerFile);
  const routes = [];
  const methodRegex = /router\.(get|post|put|delete|patch)\(\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = methodRegex.exec(src))) {
    routes.push({ method: m[1].toUpperCase(), path: m[2] });
  }
  // find controller file import in router to map to controller file
  const ctrlRegex = /from\s+['"]\.\.\/\.\.\/controllers\/([^'"]+)['"]/;
  let ctrlFile;
  const cm = ctrlRegex.exec(src);
  if (cm) ctrlFile = path.join(ROOT, 'controllers', cm[1]);
  return { routes, controllerFile: ctrlFile };
}

// Parse a controller to find the associated Mongoose model file
function parseControllerForModel(controllerFile) {
  const src = readFileSafe(controllerFile);
  if (!src) return null;
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]\.\.\/\.\.\/models\/([^'"]+)['"]/;
  const m = importRegex.exec(src);
  if (!m) return null;
  const modelFile = path.join(ROOT, 'models', m[2]);
  return modelFile;
}

// Parse a Mongoose schema file to derive OpenAPI schema
function parseModelSchema(modelFile) {
  const src = readFileSafe(modelFile);
  if (!src) return null;
  const props = {};
  const required = [];
  // naive extraction of fields like: field: { type: X, required: true, enum: [...] }
  const fieldRegex = /(\w+)\s*:\s*\{\s*([^}]+)\}/g;
  let m;
  while ((m = fieldRegex.exec(src))) {
    const name = m[1];
    const body = m[2];
    let type = 'string';
    if (/type:\s*String/.test(body)) type = 'string';
    else if (/type:\s*Number/.test(body)) type = 'number';
    else if (/type:\s*Boolean/.test(body)) type = 'boolean';
    else if (/Date/.test(body)) type = 'string';
    else if (/ObjectId/.test(body)) type = 'string';
    const prop = { type };
    // add common formats for better examples
    const lname = name.toLowerCase();
    if (type === 'string') {
      if (lname.includes('email')) prop.format = 'email';
      else if (lname.includes('date') || lname.includes('time')) prop.format = 'date-time';
      else if (lname.endsWith('id')) prop.format = 'objectid';
    }
    const enumMatch = /enum:\s*\[([^\]]+)\]/.exec(body);
    if (enumMatch) {
      const items = enumMatch[1]
        .split(',')
        .map(s => s.trim().replace(/['"`]/g, ''))
        .filter(Boolean);
      prop.enum = items;
    }
    if (/required:\s*true/.test(body)) {
      required.push(name);
    }
    props[name] = prop;
  }
  return { properties: props, required };
}

function exampleForSchema(schema) {
  const obj = {};
  const props = schema.properties || {};
  Object.entries(props).forEach(([k, v]) => {
    if (v.enum && v.enum.length) obj[k] = v.enum[0];
    else if (v.type === 'string') {
      const key = k.toLowerCase();
      if (key.includes('email')) obj[k] = 'user@example.com';
      else if (key.includes('phone')) obj[k] = '9000000000';
      else if (key.includes('name')) obj[k] = 'Sample Name';
      else if (key.endsWith('id')) obj[k] = '507f1f77bcf86cd799439011';
      else if (key.includes('date') || key.includes('time')) obj[k] = new Date().toISOString();
      else obj[k] = k + '_value';
    }
    else if (v.type === 'number') obj[k] = 1;
    else if (v.type === 'boolean') obj[k] = true;
    else obj[k] = null;
  });
  return obj;
}

function toTag(moduleBase, subpath, filePath) {
  // E.g., moduleBase '/api/v1/assets', subpath '/masters' => 'Assets - Masters'
  const mod = moduleBase.split('/').pop();
  const seg = subpath.replace(/^\//, '').replace(/-/g, ' ');
  return (mod.charAt(0).toUpperCase() + mod.slice(1)) + ' - ' + (seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : path.basename(filePath, '.js'));
}

function buildOpenApiBase() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'API',
      version: '1.0.0',
      description:
        'Auto-generated Swagger / OpenAPI documentation covering all modules, submodules, and endpoints.\n\nAuthentication: JWT Bearer tokens (Authorization: Bearer <token>) from middlewares/auth.js.\n\nList endpoints support pagination via `page` and `limit`.',
    },
    servers: [{ url: '/', description: 'Relative to current host' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        PaginatedResponse: {
          type: 'object',
          properties: {
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' },
            data: { type: 'array', items: { type: 'object', additionalProperties: true } },
          },
        },
        MessageResponse: {
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {},
  };
}

function loadExistingSwagger() {
  try {
    const raw = fs.readFileSync(OUTPUT_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function responseExampleForSchema(schema) {
  const ex = exampleForSchema(schema);
  ex._id = '64bca9f2b1c2a30012ab3456';
  return ex;
}

function addCrudOperations(paths, fullBase, tag, modelSchema) {
  const refSchemaName = null;
  const requestSchema = modelSchema
    ? { type: 'object', properties: modelSchema.properties, required: modelSchema.required }
    : { type: 'object', additionalProperties: true };
  const ex = exampleForSchema(requestSchema);
  const resEx = responseExampleForSchema(requestSchema);
  // List GET /
  paths[`${fullBase}`] = paths[`${fullBase}`] || {};
  if (!paths[`${fullBase}`]['get']) {
    paths[`${fullBase}`]['get'] = {
      tags: [tag],
      summary: `List ${tag}`,
      parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
        { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
      ],
      responses: {
        200: {
          description: 'Paginated list',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedResponse' }, example: { total: 1, page: 1, limit: 10, data: [resEx] } } },
        },
      },
    };
  }
  // Create POST /
  if (!paths[`${fullBase}`]['post']) {
    paths[`${fullBase}`]['post'] = {
      tags: [tag],
      summary: `Create ${tag}`,
      requestBody: {
        required: true,
        content: { 'application/json': { schema: requestSchema, example: ex } },
      },
      responses: {
        201: { description: 'Created', content: { 'application/json': { schema: { type: 'object', additionalProperties: true }, example: resEx } } },
      },
    };
  }
  // GET /:id
  const byId = `${fullBase}/{id}`;
  paths[byId] = paths[byId] || {};
  if (!paths[byId]['get']) {
    paths[byId]['get'] = {
      tags: [tag],
      summary: `Get ${tag} by ID`,
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: {
        200: { description: 'Detail', content: { 'application/json': { schema: { type: 'object', additionalProperties: true }, example: resEx } } },
        404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' }, example: { message: 'Not found' } } } },
      },
    };
  }
  // PUT /:id
  if (!paths[byId]['put']) {
    paths[byId]['put'] = {
      tags: [tag],
      summary: `Update ${tag}`,
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: { required: true, content: { 'application/json': { schema: requestSchema, example: ex } } },
      responses: {
        200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object', additionalProperties: true }, example: resEx } } },
        404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' }, example: { message: 'Not found' } } } },
      },
    };
  }
  // DELETE /:id
  if (!paths[byId]['delete']) {
    paths[byId]['delete'] = {
      tags: [tag],
      summary: `Delete ${tag}`,
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { 200: { description: 'Deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' }, example: { message: 'Deleted successfully' } } } } },
    };
  }
}

function addCustomOperation(paths, fullPath, method, tag, requestSchema) {
  // Convert Express-style params to OpenAPI style
  const key = fullPath.replace(/\/:([A-Za-z0-9_]+)/g, '/{$1}');
  paths[key] = paths[key] || {};
  const summary = `${method} ${fullPath}`;
  const op = {
    tags: [tag],
    summary,
    responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } } },
  };
  // Add path params
  const paramNames = [];
  const m = key.match(/\{([A-Za-z0-9_]+)\}/g);
  if (m) {
    for (const pm of m) {
      paramNames.push(pm.replace(/[{}]/g, ''));
    }
  }
  if (paramNames.length) {
    op.parameters = paramNames.map(n => ({ name: n, in: 'path', required: true, schema: { type: 'string' } }));
  }
  // For body methods, only add when a schema is available
  if (['POST', 'PUT', 'PATCH'].includes(method) && requestSchema) {
    op.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: requestSchema,
          example: exampleForSchema(requestSchema)
        }
      }
    };
  }
  // add better response examples for known endpoints
  const lowerKey = key.toLowerCase();
  if (lowerKey.endsWith('/opd/tokens') && method === 'POST') {
    op.responses = {
      201: {
        description: 'Token issued',
        content: {
          'application/json': {
            schema: { type: 'object', additionalProperties: true },
            example: {
              _id: '64bca9f2b1c2a30012ab3456',
              hospitalId: '507f1f77bcf86cd799439011',
              branchId: '507f1f77bcf86cd799439012',
              roomId: '507f1f77bcf86cd799439013',
              doctorId: '507f1f77bcf86cd799439016',
              patientId: '507f1f77bcf86cd799439014',
              visitId: '507f1f77bcf86cd799439015',
              tokenDate: new Date().toISOString(),
              tokenNumber: 12,
              priority: 'Normal',
              status: 'Waiting'
            }
          }
        }
      }
    };
  } else if (lowerKey.endsWith('/patient-register') && method === 'POST') {
    op.responses = {
      201: {
        description: 'Registered and visited',
        content: {
          'application/json': {
            schema: { type: 'object', additionalProperties: true },
            example: { message: 'User registered and Visited Sucessfully' }
          }
        }
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/MessageResponse' },
            example: { message: 'Visit Date is required' }
          }
        }
      }
    };
  }
  paths[key][method.toLowerCase()] = op;
}

function main() {
  const existing = loadExistingSwagger();
  const api = existing || buildOpenApiBase();
  api.servers = [{ url: '/', description: 'Relative to current host' }];
  if (!api.components) api.components = buildOpenApiBase().components;
  if (!api.paths) api.paths = {};
  const mounts = parseServerMounts();

  // Map controller->model schemas cache
  const schemaCache = new Map(); // modelFile -> schema
  const coveredModelFiles = new Set();
  const moduleModelFolderMap = new Map(); // base -> models subfolder

  // Handle each mount
  for (const mount of mounts) {
    const base = mount.base; // e.g., /api/v1/assets
    const mountFile = mount.file;
    const isAggregator = path.basename(mountFile) === 'index.js' && fs.existsSync(mountFile);
    if (isAggregator) {
      const subs = parseAggregator(mountFile);
      // Heuristic: map routes/<name>route to models/<name> or <name>management
      const routesFolder = path.basename(path.dirname(mountFile)); // e.g., assetmanagementroute
      let key = routesFolder.replace(/route$/i, '');
      const candidateA = path.join(MODELS_DIR, key);
      const candidateB = path.join(MODELS_DIR, key + 'management');
      if (fs.existsSync(candidateA)) moduleModelFolderMap.set(base, candidateA);
      else if (fs.existsSync(candidateB)) moduleModelFolderMap.set(base, candidateB);
      for (const s of subs) {
        const routerInfo = parseRouterFile(s.file);
        const tag = toTag(base, s.subpath, s.file);
        // Attempt to resolve model schema via controller -> model
        let modelSchema = null;
        if (routerInfo.controllerFile) {
          const modelFile = parseControllerForModel(routerInfo.controllerFile);
          if (modelFile) {
            coveredModelFiles.add(modelFile);
            if (schemaCache.has(modelFile)) modelSchema = schemaCache.get(modelFile);
            else {
              modelSchema = parseModelSchema(modelFile);
              if (modelSchema) schemaCache.set(modelFile, modelSchema);
            }
          }
        }
        // Detect if file contains standard CRUD at "/", "/:id"
        const hasList = routerInfo.routes.find(r => r.method === 'GET' && r.path === '/');
        const hasCreate = routerInfo.routes.find(r => r.method === 'POST' && r.path === '/');
        const hasGetById = routerInfo.routes.find(r => r.method === 'GET' && r.path.includes('/:id'));
        const hasUpdate = routerInfo.routes.find(r => r.method === 'PUT' && r.path.includes('/:id'));
        const hasDelete = routerInfo.routes.find(r => r.method === 'DELETE' && r.path.includes('/:id'));
        const fullBase = `${base}${s.subpath}`;
        if (hasList || hasCreate || hasGetById || hasUpdate || hasDelete) {
          addCrudOperations(api.paths, fullBase, tag, modelSchema);
        }
        // Add any custom non-root paths (no dummy bodies)
        for (const r of routerInfo.routes) {
          if (r.path !== '/' && !r.path.startsWith('/:id')) {
            // Special-case examples: login
            let reqSchema = null;
            const lowerPath = `${fullBase}${r.path}`.toLowerCase();
            if (lowerPath.endsWith('/login') && r.method === 'POST') {
              reqSchema = { type: 'object', properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } }, required: ['email', 'password'] };
            } else if (lowerPath.endsWith('/patient-register') && r.method === 'POST') {
              reqSchema = {
                type: 'object',
                properties: {
                  visitDate: { type: 'string', format: 'date-time' },
                  visitTime: { type: 'string' },
                  visitType: { type: 'string', enum: ['OPD', 'IPD', 'Emergency'] },
                  fee: { type: 'number' },
                  mobile: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  departmentId: { type: 'string' },
                  departmentName: { type: 'string' },
                  doctorId: { type: 'string' },
                  slot: { type: 'string', enum: ['Slot I', 'Slot II', 'Slot III'] },
                  patientName: { type: 'string' },
                  gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
                  maritalStatus: { type: 'string', enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
                  dob: { type: 'string', format: 'date-time' },
                  age: { type: 'number' },
                  currentAge: { type: 'number' },
                  relationType: { type: 'string' },
                  guardianName: { type: 'string' },
                  address: { type: 'string' },
                  country: { type: 'string' },
                  stateId: { type: 'string' },
                  cityId: { type: 'string' },
                  bloodGroup: { type: 'string' },
                  source: { type: 'string' },
                  referredDoctorId: { type: 'string' },
                  referralMobile: { type: 'string' },
                  paymentMode: { type: 'string', enum: ['Cash', 'Card', 'UPI', 'Insurance'] },
                  discountPercent: { type: 'number' },
                  remark: { type: 'string' },
                  patientImage: { type: 'string' }
                },
                required: ['visitDate', 'visitTime', 'visitType', 'fee', 'mobile', 'slot', 'patientName']
              };
            } else if (lowerPath.endsWith('/opd/tokens') && r.method === 'POST') {
              reqSchema = {
                type: 'object',
                properties: {
                  hospitalId: { type: 'string' },
                  branchId: { type: 'string' },
                  roomId: { type: 'string' },
                  patientId: { type: 'string' },
                  visitId: { type: 'string' },
                  doctorId: { type: 'string' },
                  priority: { type: 'string', enum: ['Normal', 'Urgent'] }
                },
                required: ['hospitalId', 'branchId', 'roomId', 'patientId', 'visitId']
              };
            }
            addCustomOperation(api.paths, `${fullBase}${r.path}`, r.method, tag, reqSchema);
          }
        }
        // Add per-id nested custom paths (e.g., /:id/schedule) without dummy bodies
        for (const r of routerInfo.routes) {
          if (r.path.startsWith('/:id') && r.path !== '/:id') {
            addCustomOperation(api.paths, `${fullBase}${r.path}`, r.method, tag, null);
          }
        }
      }
    } else {
      // Single router file mounted directly
      const routerInfo = parseRouterFile(mountFile);
      const tag = toTag(base, '', mountFile);
      // Attempt to resolve model schema
      let modelSchema = null;
      if (routerInfo.controllerFile) {
        const modelFile = parseControllerForModel(routerInfo.controllerFile);
        if (modelFile) {
          coveredModelFiles.add(modelFile);
          if (schemaCache.has(modelFile)) modelSchema = schemaCache.get(modelFile);
          else {
            modelSchema = parseModelSchema(modelFile);
            if (modelSchema) schemaCache.set(modelFile, modelSchema);
          }
        }
      }
      const fullBase = base;
      const hasList = routerInfo.routes.find(r => r.method === 'GET' && r.path === '/');
      const hasCreate = routerInfo.routes.find(r => r.method === 'POST' && r.path === '/');
      const hasGetById = routerInfo.routes.find(r => r.method === 'GET' && r.path.includes('/:id'));
      const hasUpdate = routerInfo.routes.find(r => r.method === 'PUT' && r.path.includes('/:id'));
      const hasDelete = routerInfo.routes.find(r => r.method === 'DELETE' && r.path.includes('/:id'));
      if (hasList || hasCreate || hasGetById || hasUpdate || hasDelete) {
        addCrudOperations(api.paths, fullBase, tag, modelSchema);
      }
      for (const r of routerInfo.routes) {
        if (r.path !== '/' && !r.path.startsWith('/:id')) {
          let reqSchema = null;
          const lowerPath = `${fullBase}${r.path}`.toLowerCase();
          if (lowerPath.endsWith('/login') && r.method === 'POST') {
            reqSchema = { type: 'object', properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } }, required: ['email', 'password'] };
          } else if (lowerPath.endsWith('/patient-register') && r.method === 'POST') {
            reqSchema = {
              type: 'object',
              properties: {
                visitDate: { type: 'string', format: 'date-time' },
                visitTime: { type: 'string' },
                visitType: { type: 'string', enum: ['OPD', 'IPD', 'Emergency'] },
                fee: { type: 'number' },
                mobile: { type: 'string' },
                email: { type: 'string', format: 'email' },
                departmentId: { type: 'string' },
                departmentName: { type: 'string' },
                doctorId: { type: 'string' },
                slot: { type: 'string', enum: ['Slot I', 'Slot II', 'Slot III'] },
                patientName: { type: 'string' },
                gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
                maritalStatus: { type: 'string', enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
                dob: { type: 'string', format: 'date-time' },
                age: { type: 'number' },
                currentAge: { type: 'number' },
                relationType: { type: 'string' },
                guardianName: { type: 'string' },
                address: { type: 'string' },
                country: { type: 'string' },
                stateId: { type: 'string' },
                cityId: { type: 'string' },
                bloodGroup: { type: 'string' },
                source: { type: 'string' },
                referredDoctorId: { type: 'string' },
                referralMobile: { type: 'string' },
                paymentMode: { type: 'string', enum: ['Cash', 'Card', 'UPI', 'Insurance'] },
                discountPercent: { type: 'number' },
                remark: { type: 'string' },
                patientImage: { type: 'string' }
              },
              required: ['visitDate', 'visitTime', 'visitType', 'fee', 'mobile', 'slot', 'patientName']
            };
          }
          addCustomOperation(api.paths, `${fullBase}${r.path}`, r.method, tag, reqSchema);
        }
      }
      for (const r of routerInfo.routes) {
        if (r.path.startsWith('/:id') && r.path !== '/:id') {
          addCustomOperation(api.paths, `${fullBase}${r.path}`, r.method, tag, null);
        }
      }
    }
  }

  // Include inferred CRUD docs for models without routes/controllers
  const allModelFiles = listFilesRecursive(MODELS_DIR).filter(f => f.endsWith('.js'));
  const missingModelFiles = allModelFiles.filter(f => !coveredModelFiles.has(f));
  for (const mf of missingModelFiles) {
    // Determine module base by folder heuristic
    const rel = path.relative(MODELS_DIR, mf).replace(/\\/g, '/'); // e.g., assetmanagement/AssetLocation.js
    const parts = rel.split('/');
    let moduleBase = '/api/v1/auto';
    if (parts.length > 1) {
      const folder = parts[0];
      // Try to find a mount base mapped to this folder via moduleModelFolderMap
      for (const [base, modelFolder] of moduleModelFolderMap.entries()) {
        if (modelFolder.endsWith(folder)) {
          moduleBase = base;
          break;
        }
      }
    }
    const modelName = path.basename(mf, '.js'); // e.g., AssetLocation
    const resource = modelName
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase() + 's';
    const tag = `${moduleBase.split('/').pop().charAt(0).toUpperCase() + moduleBase.split('/').pop().slice(1)} - ${resource}`;
    const schema = parseModelSchema(mf) || { properties: {}, required: [] };
    const ex = exampleForSchema({ properties: schema.properties });
    // Add CRUD under inferred path
    const fullBase = `${moduleBase}/${resource}`;
    addCrudOperations(api.paths, fullBase, tag, schema);
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(api, null, 2), 'utf8');
  console.log(`Swagger JSON written to ${OUTPUT_FILE}`);
  // Report summary
  console.log(`Endpoints documented: ${Object.keys(api.paths).length}`);
}

main();
