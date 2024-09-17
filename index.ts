import express from "express";
import Web3, { Contract, Web3Context, providers } from "web3";
import contractFactoryAbi from "./abi/ContractFactory.json";
import blocVoteAbi from "./abi/BlocVote.json";
import bodyParser from "body-parser";

const app = express();
const port = 3000; // Replace with your desired port

// body and json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let factory: any;
let blocVote: any;
const rpc = process.env.QUICKNODE_RPC_URL!;
const deployer = process.env.DEPLOYER!;
const bvAddy = process.env.BLOCVOTE_CA!;
const privateKey = process.env.PRIVATE_KEY!;

const provider = new Web3.providers.HttpProvider(rpc);
const web3 = new Web3(provider);
try {
  // console.log(deployer, bvAddy);

  // console.log({ provider });

  // contract factory declaration

  const contractFactoryAddress = process.env.CONTRACT_FACTORY_ADDY!;
  const blocVoteAddress = bvAddy;

  factory = new web3.eth.Contract(
    contractFactoryAbi.abi,
    contractFactoryAddress,
    new Web3Context(rpc)
  );

  blocVote = new web3.eth.Contract(
    blocVoteAbi.abi,
    blocVoteAddress,
    new Web3Context(rpc)
  );

  console.log({ blocVoteAddress, deployer, rpc });
} catch (error) {
  console.log({ error });
}

// api endpoints

// cast vote
app.get("/vote", async (req, res) => {
  try {
    console.log({ methods: blocVote.methods });

    const bVote = await blocVote.methods
      .castVote(0, 0)
      .send({ from: deployer });
    console.log({ hash: bVote });

    return res.json({ hash: bVote });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occurred sending vote",
      error,
    });
  }
});

// register new office

app.get("/office/new/:office", async (req, res) => {
  console.log("Processing...");
  const office = req.params.office;
  console.log({ office });

  try {
    const registerOffice = await blocVote.methods
      .registerOffice(office)
      .send({ from: deployer, office });
    console.log({ status: registerOffice });

    return res.json({ valid: "valid" });
  } catch (error) {
    console.log(error);

    return res.json({
      message: "An error occurred registering office",
    });
  }
});

app.get("/candidate/new/:name/:officeId", async (req, res) => {
  console.log("Processing...");
  try {
    const name = req.params.name;
    const office = req.params.officeId;
    console.log({ name, office });

    const registerCandidate = await blocVote.methods
      .registerCandidate(name, office)
      .send({ from: deployer, office });

    const response = { status: registerCandidate };
    console.log({ response });

    return res.json({ response });
  } catch (error) {
    console.log(error);

    return res.json({
      message: "An error occurred registering office",
    });
  }
});

app.get("/office/:index", async (req, res) => {
  console.log("Processing...");
  const index = req.params.index;
  console.log({ index });
  try {
    // console.log({ methods: blocVote.methods });
    const office = await blocVote.methods
      .offices(index)
      .send({ from: deployer });

    const response = { office };
    console.log({ response });
    return res.json({ response });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error fetching offices" });
  }
});

// read current chairman
app.get("/chairman", async (req, res) => {
  try {
    // console.log({ methods: blocVote.methods });
    console.log("Processing...");

    const chairman = await blocVote.methods.chairman().call();

    console.log({ chairman });

    return res.json({ chairman });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occurred fetching election chairman",
    });
  }
});

// read election result
app.get("/result", async (req, res) => {
  try {
    console.log({ methods: blocVote.methods });

    const result = await blocVote.methods.getResult().call();

    console.log({ result });

    return res.json({ result });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occurred fetching election chairman",
    });
  }
});

// initilize the contract
app.get("/deploy", async (req, res) => {
  try {
    console.log({ methods: factory.methods });

    const deployed = await factory.methods.deploy().send({ from: deployer });
    console.log({ hash: deployed });

    return res.json({ hash: deployed.transactionHash });
  } catch (error) {
    console.log(error);
  }
});

app.get("/deployed", async (req, res) => {
  const contracts = await factory.methods.deployedContracts().call();
  console.log({ contracts });
  return res.json({ contracts });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
