const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const truffleAssert = require('truffle-assert');
const { ZERO_ADDRESS } = constants;

const WrappedXRP = artifacts.require("WrappedXRP");

contract("WrappedXRP",  ([_, registryFunder, creator, operator, receiver, someone, nextMinter]) => {

  beforeEach(async () => {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await WrappedXRP.new({ from: creator });
    this.mintUserData = web3.utils.fromAscii("received gift");
    this.mintOperatorData = web3.utils.fromAscii("sent donation");
    this.mintAmount = 89;
  });

  it("has the correct name", async () => {
    this.token.name = "Trakx Wrapped XRP";
  })

  it("has the correct symbol", async () => {
    this.token.symbol = "wXRP";
  })

  it("adds the creator to the Minters", async () => {
    await expectEvent.inConstruction(this.token, "MinterAdded", {
      account: creator
    });
  })

  it("should not allow someone random to mint.", async () => {
    
    truffleAssert.fails(this.token.mint(receiver, this.mintAmount, this.mintUserData, this.mintOperatorData,
       { from: someone }));

  });

  it("should allow creator to mint and raise events on mint.", async () => {

    const minting = await this.token.mint(receiver, this.mintAmount, this.mintUserData, this.mintOperatorData,
       { from: creator });

    const balance = await this.token.balanceOf(receiver);
    balance.should.be.bignumber.equal(this.mintAmount.toString(), `${this.mintAmount} coins should have appeared on the receiver's account.`);

    const totalSupply = await this.token.totalSupply();
    totalSupply.should.be.bignumber.equal(this.mintAmount.toString(), `${this.mintAmount} coins should have appeared on the receiver's account.`);

    await expectEvent(minting, 'Transfer', {
      from: ZERO_ADDRESS,
      to: receiver,
      value: this.mintAmount.toString(),
    });

    await expectEvent(minting, 'Minted', {
      operator: creator,
      to: receiver,
      amount: this.mintAmount.toString(),
      operatorData: this.mintOperatorData,
      data: this.mintUserData
    });
  });
});
