import express from "express";
import bodyParser from "body-parser";
import postRouter from "./app/post.js";
import cors from "cors";

async function init() {
  const app = express();
  const port = 4001;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/post", postRouter);
  app.get("/", async (req, res) => {
    return res.send("Hello world!! THIS IS POSTS APP");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
