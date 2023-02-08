module.exports = {
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPPLIER: "SUPPLIER",
  },
  MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  PERMISSIONS: Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    SUPER_ADMIN: ["all"],
    CONTENT_MANAGER: ["course", "blog", "category", "product"],
    TEACHER: ["course", "blog"],
    SUPPLIER: ["product"],
    ALL: "all",
  }),
};
