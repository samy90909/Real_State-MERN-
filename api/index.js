import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();



if (!process.env.MONGO) {
    console.error('MongoDB connection string not provided. Exiting...');
    process.exit(1);
}
//proimise funciton in js 
mongoose.connect("mongodb+srv://hlobhandari909:hlobhandari909@mernstate.zdis2ir.mongodb.net/mernstate?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });


const app = express();
app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter);

//middle Wares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });

})


app.listen(3000, () => {
    console.log("Server is running at port 3000");
});