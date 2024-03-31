import Express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserManagementRouter from "./routes/UserManagementRoutes.js";


const app  = Express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", UserManagementRouter);

const PORT = process.env.PORT || 3009

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://Abhinay:6DhyJTgIoqo50EdP@web3cluster.mxahtxl.mongodb.net/usersInfoDb?retryWrites=true&w=majority&appName=Web3Cluster");

        app.listen(PORT, () => {
            console.log(`The Server is running on the port ${3009}`)
        })
    } catch(error) {
        console.log("Error While Starting The Server", error.message);
    }
}


startServer();

export default app;
