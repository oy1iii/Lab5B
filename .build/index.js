"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_koa = __toESM(require("koa"));
var import_koa_compose = __toESM(require("koa-compose"));
var import_koa_logger = __toESM(require("koa-logger"));
var import_koa_json = __toESM(require("koa-json"));
const app = new import_koa.default();
const router = new import_koa_compose.default();
router.get("/api/v1", async (ctx, next) => {
  ctx.body = { message: "Welcome to the blog API!" };
  await next();
});
app.use((0, import_koa_logger.default)());
app.user((0, import_koa_json.default)());
app.user(router.routes());
app.listen(10888);
//# sourceMappingURL=index.js.map
