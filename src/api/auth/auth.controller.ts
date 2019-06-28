import { Request, Response } from 'express';
import User from '../../models/user.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS: number = 10;
const SECRET_KEY: string = "A16R03I1999"

export default class AuthController {
    public signIn = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return res.status(401).send({
                    success: false,
                    message: 'Not authorized'
                });
            }

            const accessToken = jwt.sign({ email }, SECRET_KEY);

            const date = new Date();
            const tokenExpiresIn = date.getTime() + 720000;


            res.status(200).send({
                success: true,
                message: 'Token generated Successfully',
                data: { "accessToken": accessToken, "tokenExpiresIn": tokenExpiresIn, "user": user }
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
        res.status(200).send({
            success: true,
            message: 'Token generated Successfully',
        });
    }
    public signUp = async (req: Request, res: Response): Promise<any> => {
        const { firstName, lastName, email, password, image } = req.body;
        try {
            const userExist = await User.findOne({ email: req.body.email });
            if (userExist) {
                return res.status(409).send({
                    success: false,
                    message: 'User already exist'
                });
            }

            const hash = await bcrypt.hash(password, SALT_ROUNDS);

            const user = new User({
                firstName,
                lastName,
                email,
                password: hash,
                image
            });

            const newUser = await user.save();

            res.status(201).send({
                success: true,
                message: 'User Successfully created',
                data: newUser
            });

        } catch (err) {
            console.log("err");
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }

    public isLoggedIn = async (req: Request, res: Response): Promise<any> => {
        try {
            
            const user = await User.findOne({ email: req.body.email });
            
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).send({
                success: true,
                message: 'User is logged in',
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }
}