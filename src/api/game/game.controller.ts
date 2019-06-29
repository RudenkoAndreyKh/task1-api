import { Request, Response } from 'express';
import Game from '../../models/game.model';

export default class GameController {
    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const games = await Game.find();
            if (!games) {
                return res.status(404).send({
                    success: false,
                    message: 'Games not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: games
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }

    }

    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const game = await Game.findOne({ _id: req.params.id });
            if (!game) {
                return res.status(404).send({
                    success: false,
                    message: 'Game not found',
                });
            }
            res.status(200).send({
                success: true,
                data: game
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }

    }

    public update = async (req: Request, res: Response): Promise<any> => {
        const { name, description, price, image } = req.body;
        try {
            
            const gameUpdated = await Game.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name,
                        description,
                        price,
                        image
                    }
                },
                { new: true }
            );
            if (!gameUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Game not found',
                });
            }
            res.status(200).send({
                success: true,
                data: gameUpdated
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }
    }

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            const game = await Game.findByIdAndRemove(req.params.id);

            if (!game) {
                return res.status(404).send({
                    success: false,
                    message: 'Game not found',
                });
            }
            Game.remove({ _id: req.params.id }, function (err: Error) {
                if (!err) {
                    res.status(204).send();
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: err.toString(),
                        data: null
                    });
                }
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }
    }

    public add = async (req: Request, res: Response): Promise<any> => {
        const { name, description, price, image } = req.body;
        try {
            const gameExist = await Game.findOne({ name: req.body.name });
            if (gameExist) {
                return res.status(409).send({
                    success: false,
                    message: 'Game already exist'
                });
            }

            const game = new Game({
                name,
                description,
                price,
                image
            });

            const newGame = await game.save();

            res.status(201).send({
                success: true,
                message: 'Game Successfully created',
                data: newGame
            });

        } catch (err) {
            console.log("err");
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }
}