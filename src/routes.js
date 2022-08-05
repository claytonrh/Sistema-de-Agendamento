import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer.js';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import FileController from './app/controllers/FileController.js';
import CollaboratorController from './app/controllers/CollaboratorController.js';
import AppointmentController from './app/controllers/AppointmentController.js';
import ScheduleController from './app/controllers/ScheduleController.js';
import NotificationsController from './app/controllers/NotificationsController.js';

import authMiddleware from './app/middlewares/auth.js'

const routes = new Router();
const upload = multer(multerConfig)


routes.get('/', (req, res) => {
    res.json({message: 'Okay'})
  })

  routes.post('/users', UserController.store)
  routes.post('/session', SessionController.store)
  
  // Rotas autenticadas
  routes.use(authMiddleware)
  routes.put('/users',  UserController.update)
  
  // Rota de agendamento
  routes.post('/appointments', AppointmentController.store)
  
  // Listagem de agendamento
  routes.get('/appointments', AppointmentController.index)
  
  // Lista todos os colaboradores
  routes.get('/collaborator', CollaboratorController.index)
  
  // Listagem de agendamentos colaborador
  routes.get('/schedule', ScheduleController.index)
  
  // Listagem de notificações
  routes.get('/notifications', NotificationsController.index)
  
  // Marcar como lida
  routes.put('/notifications/:id', NotificationsController.update)
  
  // Upload de arquivos
  routes.post('/files', upload.single('file'), FileController.store);
  
  export default routes;