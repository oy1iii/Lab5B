import Router, {RouterContext} from "koa-router";

const articles = [
  {title: 'Hello article', fullText: 'some text to fill the body'},
  {title: 'another article', fullText: 'again here is some text here to fill'},
  {title: 'conventry university', fullText: 'again here is some text here to fill'},
  {title: 'smart campus', fullText: 'again here is some text here to fill'}
]

const router = new Router({prefix: '/api/v1/articles'});

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await.next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  await.next();
}

const getById = async (ctx: RouterContext, next: any) => {
  await.next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  await.next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  await.next();
}

router.get('/', getAll);
router.get('/', createArticle);
router.get('/:id', getById);
router.get('/:id', updateArticle);
router.get('/:id', deleteArticle);

export{ router }