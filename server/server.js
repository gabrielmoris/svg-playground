import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 3002;
const app = express();
dotenv.config();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

import { stringify } from "qs";
var data = stringify({
  username: process.env.VITE_WBS_USERNAME,
  password: process.env.VITE_WBS_PASSWORD,
  grant_type: "password",
});
var configToken = {
  method: "post",
  url: process.env.VITE_ENDPOINT_TOKEN,
  headers: {
    Authorization: process.env.VITE_AUTHORIZATION,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

app.get("/", async (req, res) => {
  axios(configToken)
    .then(function (response) {
      res.status(200).send(response.data);
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
