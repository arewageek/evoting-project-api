import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import { Web3 } from "web3";
import BlocVote from "./abi/BlocVote.json";
import ContractFactory from "./abi/ContractFactory.json";

interface VoteInterface {
  voter: string;
  candidate: string;
}

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize web3 rpc
const web3 = new Web3(process.env.QUICKNODE_RPC_PROVIDER!);

// initialize wallet
// const dev = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY!);
console.log({ key: process.env.PRIVATE_KEY! });

app.post("/vote", async (req: Request, res: Response) => {
  const { vote } = req.body;

  const votes: VoteInterface[] = [];

  return res.json({
    status: 200,
    message: "Transaction processing...",
  });
});

app.post("/contract/create", async (req: Request, res: Response) => {
  // const abi =
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port: ${port}...`));
