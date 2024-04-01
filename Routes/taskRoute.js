import express from 'express';

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../Controllers/taskControllers.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/new', createTask);
router.get('/task/:id', getTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;