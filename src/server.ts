import * as express from "express";
const app = express();

app.get("/", (request, respose) => {
  return respose.send("Hello world");
});

app.listen(3000);
