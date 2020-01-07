import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "@drizzle/react-components";

import logo from "./logo.png";

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>Drizzle Examples</h1>
      <p>Examples of how to get started with Drizzle in various situations.</p>
    </div>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex={0} units="ether" precision={3} />
    </div>

    <div className="section">
      <h2>WrappedXRP</h2>
      <p>
        This shows a simple ContractData component with no arguments, along with
        a form to set its value.
      </p>
      <p>
        <strong>Token Name: </strong>
        <ContractData contract="WrappedXRP" method="name" />
      </p>
      <p>
        <strong>Token Symbol: </strong>
        <ContractData contract="WrappedXRP" method="symbol" />
      </p>
      <p>
        <strong>Total supply: </strong>
        <ContractData contract="WrappedXRP" method="totalSupply" />
      </p>
    </div>

    <div className="section">
      <h2>Minting</h2>
      <p>
        <strong>Mint: </strong>
        <ContractForm contract="WrappedXRP" method="mint"
          labels={["Destination address", "Amount to mint", "User message", "Minter message"]} />
      </p>
    </div>
  </div>
);
