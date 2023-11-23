const express = require("express");
const path = require("path");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const axios = require("axios").default;
const cors = require('cors')


async function getLogs() {
  const devUri =
    "mongodb+srv://db_user:52hbBtlH5uFKOd4p@zluri-dev-v5.hpjxh.mongodb.net/?readPreference=secondary";
  const devClient = new MongoClient(devUri, { useUnifiedTopology: true });
  await devClient.connect();

  const logsData = await devClient
    .db("zluri")
    .collection("orgintegrationlogs")
    .findOne(
      {
        org_id: ObjectId("6107c36bd3f57c002fddf176"),
        log_type: "connect_error",
      },
      { sort: { _id: -1 } }
    );
  console.log("error ", logsData?.payload?.error);
}
app.get("/", async function (req, res) {
  //   await getLogs();
  const query = req?.query?.query
  await axios.get("http://127.0.0.1:5000/process_query?query="+query)
  .then(function (response) {
    // handle success
    console.log(response?.data?.result);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
  
  res.sendFile(path.join(__dirname + "/home.html"));
});

app.get("/style.css", function (req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});
app.get("/frontend.js", function (req, res) {
  res.sendFile(__dirname + "/" + "frontend.js");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

const prevResp = [];
app.get("/query", async (req, res) => {
  //const query = req?.body?.id
  
  const query = req?.query?.query
  await axios.get("http://127.0.0.1:5000/process_query?query="+query)
  .then(function (response) {
    // handle success
    console.log(response?.data?.result);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
  
  // const data = await axios(config);
  // console.log(data);

  res.sendFile(path.join(__dirname + "/query.html"));
});
app.listen(process.env.port || 3000);
