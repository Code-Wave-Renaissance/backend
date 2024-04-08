import express from 'express';

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
  addApplicants,
} from '../Controllers/taskControllers.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/new', createTask);
router.get('/task/:id', getTask);
router.put('/update/:id', updateTask);
// router.patch('/update/:id', updateTask);
router.put('/add-applicants/:id', addApplicants);
router.delete('/delete/:id', deleteTask);

export default router;