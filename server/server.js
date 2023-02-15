import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";
import { stringify } from "qs";

const port = 3002;
const app = express();
dotenv.config();
// Bad behaviour, I should check first refreshTocken
function hasCookie(req, res, next) {
  if (req.headers.authorization) {
    console.log("Already authorized");
    // console.log("headers auth", req.headers.authorization);
    next();
  } else {
    // Here I should check If I have the refress Token
    //request from refresh (I send the refresh tocken)
    console.log("In proccess of authorizing,");
    let configToken = {
      method: "post",
      url: process.env.VITE_ENDPOINT_TOKEN,
      headers: {
        Authorization: process.env.VITE_AUTHORIZATION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(configToken)
      .then(function (response) {
        res
          .cookie("refresh_token", response.data.refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: response.data.refresh_expires_in * 600000,
          })
          .json({ Authorization: response.data.access_token });
      })
      .catch(function (error) {
        console.log(error);
      });
    next();
  }
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(hasCookie);

var data = stringify({
  username: process.env.VITE_WBS_USERNAME,
  password: process.env.VITE_WBS_PASSWORD,
  grant_type: "password",
});

app.get("/", async (req, res) => {
  res.status(200);
});

app.get("/saalplan/:id", async (req, res) => {
  const showId = req.params.id;

  const date = new Date().toISOString();

  var config1 = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://test-eras.stage-entertainment.de/shows/${showId}/floorplan?hidePrices=0&withoutJS=0&withPromotions=false`,
    headers: {
      accept: "application/svg+xml",
      Authorization: req.headers.authorization,
    },
  };

  axios(config1)
    .then(function (response) {
      res.status(200).send(JSON.stringify({ saalplan: response.data }));
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
