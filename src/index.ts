import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const sellerRouter = require('./modules/seller/routes');
const productRouter = require('./modules/product/routes');


dotenv.config();

export const server = express();

server.use(cors());
server.use(express.json());


server.use('/', sellerRouter)
server.use('/', productRouter)



server.listen(process.env.PORT, () => {
    console.log(`server rodando na porta ${process.env.PORT}`)
});