import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/users';

const router = new Router({ prefix: '/api/v1/users' });

const getAll = async (ctx: RouterContext, next: any)=> {
 let users = await model.getAll();
 if (users.length) {
  ctx.body = users;
 } else {
  ctx.body = {}
 }
 await next();
}

const createUser = async (ctx: RouterContext, next: any) => {
   const body = ctx.request.body;
   let result = await model.add(body);
   if (result.status == 201) {
   ctx.status = 201;
   ctx.body = body;
 } else {
   ctx.status = 500;
   ctx.body = {err: "insert data failed"};
 }
 await next();
}

const getById = async (ctx: RouterContext, next: any)=> {
   let id = ctx.params.id;
   let user = await model.getById(id);
   if (user.length) {
     ctx.body = user[0];
   } else {
     ctx.status = 404;
   }
 await next();
}

const updateuser = async (ctx: RouterContext, next: any) => {
   let id = +ctx.params.id;
   let body = ctx.request.body;
   let result = await model.updateById(id, body);
   if (result.status == 201) {
     ctx.status = 201;
     ctx.body = body;
   } else {
     ctx.status = 500;
     ctx.body = result.status;
   }
 await next();
}

const deleteUser = async (ctx: RouterContext, next: any)=> {
   let id = ctx.params.id;

   let user = await model.getById(id);
   if (user.length) {
     await model.deletById(id);
     ctx.status = 201;
     ctx.body = {msg: "Record deleted!"};
   } else {
     ctx.status = 404;
   }
 await next();
}

router.get('/', getAll);
router.post('/', bodyParser(), createUser);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})',  bodyParser(), updateuser);
router.delete('/:id([0-9]{1,})', deleteUser);


export { router }