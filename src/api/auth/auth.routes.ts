import { Router } from 'express';
import Controller from './auth.controller';

const auth: Router = Router();
const controller = new Controller();

// Sign In
auth.post('/signIn', controller.signIn);

// Register New User
auth.post('/signUp', controller.signUp);

auth.post('/isLoggedIn', controller.isLoggedIn);

export default auth;
