import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";
import { stringify } from "qs";

const port = 3002;
const app = express();
dotenv.config();
function hasCookie(req, res, next) {
  console.log("headers auth", req.headers.authorization);
  if (req.headers.authorization) {
    next();
  } else {
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

app.get("/saalplan", async (req, res) => {
  const date = new Date().toISOString();
  var config0 = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://test-eras.stage-entertainment.de/shows/search?category=Musik%20or%20Sonstiges&city=Hamburg&endDate=2023-03-20T20%3A00%3A00&eventname=HAMILTON&locationCode=5155&startDate=${date.slice(
      0,
      10
    )}T00%3A00%3A00&withPromotions=true&withReductions=true&withZones=true`,
    headers: {
      accept: "application/json",
      Authorization: req.headers.authorization,
    },
  };

  axios(config0)
    .then(function (response) {
      res.status(200);
      console.log(
        response.data[Math.floor(Math.random() * response.data.length)].id
      );

      var config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://test-eras.stage-entertainment.de/shows/${
          response.data[Math.floor(Math.random() * response.data.length)].id
        }/floorplan?hidePrices=0&withoutJS=0&withPromotions=false`,
        headers: {
          accept: "application/svg+xml",
          Authorization: req.headers.authorization,
        },
      };
      axios(config1)
        .then(function (response) {
          res.status(200).send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
