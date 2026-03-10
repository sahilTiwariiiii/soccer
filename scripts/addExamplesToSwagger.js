export function addExamplesToSwagger(api) {
  const paths = api.paths;
  for (const path in paths) {
    for (const method in paths[path]) {
      const op = paths[path][method];
      if (op.requestBody && op.requestBody.content && op.requestBody.content['application/json']) {
        const schema = op.requestBody.content['application/json'].schema;
        if (schema) {
          op.requestBody.content['application/json'].example = exampleForSchema(schema);
        }
      }
    }
  }
}

export function exampleForSchema(schema) {
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