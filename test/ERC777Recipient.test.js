const { singletons, BN, expectEvent } = require('openzeppelin-solidity/test-helpers');

const ERC777Token = artifacts.require('ERC777Token');
const ERC777Recipient = artifacts.require('ERC777Recipient');

contract('ERC777Recipient', function ([_, registryFunder, creator, holder]) {
  const data = web3.utils.sha3('777TestData');

  beforeEach(async function () {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await ERC777Token.new({ from: creator });
    const amount = new BN(10000);
    await this.token.send(holder, amount, data, { from: creator });
    this.recipient = await ERC777Recipient.new(this.token.address, { from: creator });
  });

  it('sends to a contract from an externally-owned account', async function () {
    const amount = new BN(1000);
    const receipt = await this.token.send(this.recipient.address, amount, data, { from: holder });

    await expectEvent.inTransaction(receipt.tx, ERC777Recipient, 'DoneStuff', { from: holder, to: this.recipient.address, amount: amount, userData: data, operatorData: null });

    const recipientBalance = await this.token.balanceOf(this.recipient.address);
    recipientBalance.should.be.bignumber.equal(amount);
  });
});
