import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authHeader from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.login);

routes.use(authHeader);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

export default routes;
