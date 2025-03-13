import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoute from './routes/authRoutes.js'
import { errorHandler } from "./middleware/errorHandler.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000


app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/api/auth',authRoute);


//Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))