import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => console.log(`Server is runing on ${port}`));
