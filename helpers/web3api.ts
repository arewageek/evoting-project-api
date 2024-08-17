import Web3 from "web3";

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.SEPOLIA_RPCURL;

const web3 = new Web3.HttpProvider(rpcUrl);

export interface VoteInterface {
  voter: number;
  votes: {
    office: number;
    candidate: number;
  }[];
  timestamp: number;
}

async function recordVote(data: VoteInterface) {
  return true;
}
