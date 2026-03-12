import express from "express";
import { createPermissionGroup, getPermissionGroups, updatePermissionGroup, deletePermissionGroup } from "../../controllers/usermanagement/permission.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/group", createPermissionGroup);
router.get("/groups", getPermissionGroups);
router.put("/group", updatePermissionGroup);
router.delete("/group/:groupId", deletePermissionGroup);

export default router;
