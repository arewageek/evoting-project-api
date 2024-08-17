import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import { Web3 } from "web3";
import BlocVote from "./abi/BlocVote.json";
import ContractFactory from "./abi/ContractFactory.json";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize web3 rpc
const web3 = new Web3();
const web3Provider = new web3.providers.HttpProvider(
  process.env.QUICKNODE_RPC_URL!
);

app.post("/vote", async (req: Request, res: Response) => {
  const { vote } = req.body;

  return res.json({
    status: 200,
    message: "Transaction processing...",
  });
});

app.post("/contract/create", async (req: Request, res: Response) => {
  const deployer = await web3.accountProvider?.privateKeyToAccount(
    process.env.PRIVATE_KEY!
  );
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port: ${port}...`));
