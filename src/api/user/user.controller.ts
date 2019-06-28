import { Request, Response } from 'express';
import User from '../../models/user.model';
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

export default class UserController {
    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(404).send({
                    success: false,
                    message: 'Users not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: users
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
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                });
            }
            res.status(200).send({
                success: true,
                data: user
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }

    }

    public update = async (req: Request, res: Response): Promise<any> => {
        const { firstName, lastName, email, unhashedPass, image } = req.body;
        console.log(req.body);
        
        try {
            const password = await bcrypt.hash(unhashedPass, SALT_ROUNDS);
            const userUpdated = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        firstName,
                        lastName,
                        email,
                        password,
                        image
                    }
                },
                { new: true }
            );
            if (!userUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                });
            }
            res.status(200).send({
                success: true,
                data: userUpdated
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
            const user = await User.findByIdAndRemove(req.params.id);

            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                });
            }
            User.remove({ _id: req.params.id }, function (err: Error) {
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
}