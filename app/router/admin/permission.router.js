const {
  PermissionController,
} = require("../../http/controller/admin/RBAC/permission.controller");

const router = require("express").Router();
router.get("/list", PermissionController.getAllPermissions);
router.post("/add", PermissionController.createNewPermission);
router.delete("/remove/:id", PermissionController.removePermission);
router.patch("/update/:id", PermissionController.updatePermissionByID);
module.exports = {
  AdminApiPermissionRouter: router,
};
