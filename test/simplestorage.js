const { expectEvent, singletons, constants, BN } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const WrappedXRP = artifacts.require("WrappedXRP");

contract("WrappedXRP",  ([_, registryFunder, creator, operator, receiver]) => {

  beforeEach(async () => {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await WrappedXRP.new({ from: creator });
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


  it("...should allow creator to mint.", async () => {
    
    const mintAmount = 89;

    const userData = web3.utils.fromAscii("received gift");
    const operatorData = web3.utils.fromAscii("sent donation");
    const minting = await this.token.mint(receiver, mintAmount, userData, operatorData, { from: creator });

    const balance = await this.token.balanceOf(receiver);
    balance.should.be.bignumber.equal(mintAmount.toString(), "89 coins should have appeared on the receiver's account.");

    const totalSupply = await this.token.totalSupply();
    totalSupply.should.be.bignumber.equal(mintAmount.toString(), "89 coins should have appeared on the receiver's account.");

    await expectEvent(minting, 'Transfer', {
      from: ZERO_ADDRESS,
      to: receiver,
      value: mintAmount.toString(),
    });

    await expectEvent(minting, 'Minted', {
      operator: creator,
      to: receiver,
      amount: mintAmount.toString(),
      operatorData: operatorData,
      data: userData
    });
  });
});
