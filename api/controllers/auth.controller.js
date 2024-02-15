import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    try {
        const newUser = new User({ username, email, hashedPassword });
        await newUser.save()
        res.status(201).json('User Created sucessfully')
    } catch (err) {
        next(err);
    }

}