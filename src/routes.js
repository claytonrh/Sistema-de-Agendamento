import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)


// a partir da linha 12 rodas as rotas serão autenticadas
routes.use(authMiddleware) 
routes.put('/users', UserController.store)


export default routes;