const { singletons, BN, expectEvent } = require('openzeppelin-solidity/test-helpers');

const ERC777Token = artifacts.require('ERC777Token');
const ERC777Sender = artifacts.require('ERC777Sender');

contract('ERC777Sender', function ([_, registryFunder, creator, holder, recipient]) {
  const data = web3.utils.sha3('777TestData');

  beforeEach(async function () {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await ERC777Token.new({ from: creator });
    const amount = new BN(10000);
    await this.token.send(holder, amount, data, { from: creator });
    this.sender = await ERC777Sender.new({ from: creator });
  });

  it('sends from an externally-owned account', async function () {
    const amount = new BN(1000);
    const tokensSenderInterfaceHash = await this.sender.TOKENS_SENDER_INTERFACE_HASH();

    await this.sender.senderFor(holder);
    await this.erc1820.setInterfaceImplementer(holder, tokensSenderInterfaceHash, this.sender.address, { from: holder });

    const receipt = await this.token.send(recipient, amount, data, { from: holder });
    await expectEvent.inTransaction(receipt.tx, ERC777Sender, 'DoneStuff', { from: holder, to: recipient, amount: amount, userData: data, operatorData: null });

    const recipientBalance = await this.token.balanceOf(recipient);
    recipientBalance.should.be.bignumber.equal(amount);
  });
});
