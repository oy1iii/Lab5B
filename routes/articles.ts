import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/articles';

const articles = [
  { title: 'Hello article', fullText: 'some text to fill the body' },
  { title: 'another article', fullText: 'again here is some text here to fill' },
  { title: 'conventry university', fullText: 'again here is some text here to fill' },
  { title: 'smart campus', fullText: 'again here is some text here to fill' }
]

const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any)=> {
 let articles = await model.getAll();
 if (articles.length) {
  ctx.body = articles;
 } else {
  ctx.body = {}
 }
 await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
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
// const createArticle = async (ctx: RouterContext, next: any) => {
//   let { title, fullText } = ctx.request.body;
//   let newArticle = { title: title, fullText: fullText };
//   articles.push(newArticle)
//   ctx.status = 201;
//   ctx.body = newArticle;
//   await next();
// }

const getById = async (ctx: RouterContext, next: any)=> {
   let id = ctx.params.id;
   let article = await model.getById(id);
   if (article.length) {
     ctx.body = article[0];
   } else {
     ctx.status = 404;
   }
 await next();
}

// const getById = async (ctx: RouterContext, next: any) => {
//   let id = +ctx.params.id;
//   if((id < articles.length + 1) && (id>0)){
//     ctx.body = articles[id-1]
//   }
//   await next();
// }

const updateArticle = async (ctx: RouterContext, next: any) => {
   let id = +ctx.params.id;
   let body = ctx.request.body;
   let result = await model.updateById(id, body);
   if (result.status == 201) {
   ctx.status = 201;
   ctx.body = body;
 } else {
   ctx.status = 500;
   ctx.body = {err: "update data faild"};
 }
 await next();
}
// const updateArticle = async (ctx: RouterContext, next: any) => {
//   let id = +ctx.params.id;
//   let { title, fullText } = ctx.request.body;
//   let updatedArticle = { title: title, fullText: fullText };
//   if((id < articles.length + 1) && (id>0)){
//     articles[id-1] = updatedArticle
//     ctx.status = 201;
//     ctx.body = updatedArticle;
//   }
//   else
//   {
//     ctx.status = 404
//   }
//   await next();
// }

const deleteArticle = async (ctx: RouterContext, next: any)=> {
   let id = ctx.params.id;

   let article = await model.getById(id);
   if (article.length) {
     await model.deletById(id);
     ctx.status = 201;
     ctx.body = {msg: "Record deleted!"};
   } else {
     ctx.status = 404;
   }
 await next();
}
// const deleteArticle = async (ctx: RouterContext, next: any) => {
//   let id = +ctx.params.id;
//   if((id < articles.length + 1) && (id>0)){
//     articles.splice(id-1, 1)
//     ctx.status = 201;
//     ctx.body = "Record Deleted!"
//   }
//   else
//   {
//     ctx.status = 404
//   }
//   await next();
// }

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})',  bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);



export { router }