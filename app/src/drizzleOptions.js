import Web3 from "web3";
import ERC777Token from "./contracts/ERC777Token.json";
import ERC777Sender from "./contracts/ERC777Sender.json";
import ERC777Recipient from "./contracts/ERC777Recipient.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [ERC777Recipient, ERC777Sender, ERC777Token],
  events: {
    ERC777Token: ["Sent", "Minted", "Burned", "AuthorizedOperator", "RevokedOperator"],
    ERC777Sender: ["TokensSent"],
    ERC777Recipient: ["TokensReceived"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
