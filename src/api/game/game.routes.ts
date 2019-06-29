import { Router } from 'express';
import Controller from './game.controller';

const game: Router = Router();
const controller = new Controller();

// Retrieve all Games
game.get('/', controller.findAll);

// Retrieve a Specific Game
game.get('/:id', controller.findOne);

// Update a Game with Id
game.put('/editGame/:id', controller.update);

// Delete a Game with Id
game.delete('/:id', controller.remove);

game.post('/add', controller.add);

export default game;
