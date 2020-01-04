import Web3 from "web3";
import TrakxWrappedXRP from "./contracts/TrakxWrappedXRP";
import TrakxWrappedXRPSender from "./contracts/TrakxWrappedXRPSender.json";
import TrakxWrappedXRPRecipient from "./contracts/TrakxWrappedXRPRecipient.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [TrakxWrappedXRP, TrakxWrappedXRPSender, TrakxWrappedXRPRecipient],
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
