import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import generalRoutes from "./routes/general.js";

//Data Imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataProduct,
  dataProductStat,
  dataUser,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/data.js";

/* CONFIGURATIONS*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // ONLY ADD DATA ONCE
    //AffiliateStat.insertMany(dataAffiliateStat)
    //OverallStat.insertMany(dataOverallStat)
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat)
    //Transaction.insertMany(dataTransaction)
    //User.insertMany(dataUser)
  })
  .catch((error) => console.log(`${error} did not connect`));
