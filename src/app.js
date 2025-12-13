import express from 'express';
import userRouter from "./routes/user.route.js";

const app = express();

// Parse JSON request body

app.use(express.json());

// Routes Declaration

app.use("/api/v1/users",userRouter);

export default app;