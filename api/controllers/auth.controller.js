import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(errorHandler(400, 'Username, email, and password are required.'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);
    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save()
        res.status(201).json('User Created sucessfully')
    } catch (err) {
        next(err);
    }
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return errorHandler(res, 404, 'User Not Found');
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return errorHandler(res, 401, 'Wrong Credentials');
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;
        // Set the token as an HTTP cookie
        res.cookie('access_token', token, { httpOnly: true });

        // Alternatively, send the token in the response body if needed
        // res.status(200).json({ token, user: validUser });

        res.status(200).json(rest);


    } catch (error) {
        next(error);
    }
};

