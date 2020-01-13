import Web3 from "web3";
import WrappedXRP from "./contracts/WrappedXRP.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [WrappedXRP],
  events: {
    WrappedXRP: [
      "AuthorizedOperator", "RevokedOperator",
      "Burned", "BurnerAdded", "BurnerRemoved",
      "Minted", "MinterAdded", "MinterRemoved",
      "Sent", "Transfer"
    ],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
