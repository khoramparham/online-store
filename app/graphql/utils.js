const { Kind } = require("graphql");

function toObject(value) {
  if (typeof value === "object") return value;
  if (typeof value === "string" && value.charAt(0) === "{") return JSON.parse(value);
  return null;
}
function parseLiteral(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
      return valueNode.value.charAt(0) === "{"
        ? JSON.parse(valueNode.value)
        : valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
    case Kind.OBJECT:
  }
}
function parseValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
    case Kind.OBJECT:
      return parseObject(valueNode.value);
    case Kind.LIST:
      return valueNode.values.map(parseValueNode);
    default:
      return null;
  }
}
module.exports = { toObject, parseLiteral, parseValueNode };
