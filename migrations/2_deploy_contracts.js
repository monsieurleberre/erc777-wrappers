const TrakxWrappedXRP = artifacts.require('TrakxWrappedXRP');
const TrakxWrappedXRPSender = artifacts.require('TrakxWrappedXRPSender');
const TrakxWrappedXRPRecipient = artifacts.require('TrakxWrappedXRPRecipient');

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

const { singletons } = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  if (network === 'development') {
    // In a test environment an ERC777 token requires deploying an ERC1820 registry
    await singletons.ERC1820Registry(accounts[0]);
  }

  await deployer.deploy(TrakxWrappedXRP);
  const token = await ERC777Token.deployed();

  await deployer.deploy(TrakxWrappedXRPSender);

  await deployer.deploy(TrakxWrappedXRPRecipient, token.address);
};
