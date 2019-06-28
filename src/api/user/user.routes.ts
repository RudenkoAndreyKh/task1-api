import { Router } from 'express';
import Controller from './user.controller';

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.get('/', controller.findAll);

// Retrieve a Specific User
user.post('/findOne', controller.findOne);

// Update a User with Id
user.put('/editUser/:id', controller.update);

// Delete a User with Id
user.delete('/:id', controller.remove);

export default user;
