const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const truffleAssert = require('truffle-assert');
const { ZERO_ADDRESS } = constants;

const TestSupervisedToken = artifacts.require("TestSupervisedToken");
const amount = 22;

contract("TestSupervisedToken",  ([creator, nextMinter, nextBurner, someone]) => {

  beforeEach(async () => {
    this.token = await TestSupervisedToken.new({ from: creator });
  });

  it("adds the creator to the Admins", async () => {
    (await this.token.isAdmin(creator)).should.be.true;
  })

  it("adds the creator to the Minters", async () => {
    await expectEvent.inConstruction(this.token, "MinterAdded", {
      account: creator,
      requester: creator
    });
    (await this.token.isMinter(creator)).should.be.true;
  })

  it("adds the creator to the Burners", async () => {
    await expectEvent.inConstruction(this.token, "BurnerAdded", {
      account: creator,
      requester: creator
    });
    (await this.token.isBurner(creator)).should.be.true;
  })

  it("allows admins to add minters, and results in correct permissions", async () => {
    (await this.token.isMinter(nextMinter)).should.be.false;
    
    const addingMinter = await this.token.addMinter(nextMinter, { from: creator });

    await expectEvent(addingMinter, "MinterAdded", {
      account: nextMinter,
      requester: creator
    });

    (await this.token.isMinter(nextMinter)).should.be.true;
    (await this.token.isBurner(nextMinter)).should.be.false;
    (await this.token.isAdmin(nextMinter)).should.be.false;

    const minting = await this.token.mint(amount, someone, { from: nextMinter });

    await expectEvent(minting, "Minted", {
      amount: amount.toString(),
      requester: nextMinter,
      target: someone
    });

    truffleAssert.fails(this.token.burn(amount, someone, { from: nextMinter }));
  })

  it("allows admins to add buners, and results in correct permissions", async () => {
    (await this.token.isBurner(nextBurner)).should.be.false;
    
    const addingMinter = await this.token.addBurner(nextBurner);

    await expectEvent(addingMinter, "BurnerAdded", {
      account: nextBurner,
      requester: creator
    });

    (await this.token.isBurner(nextBurner)).should.be.true;
    (await this.token.isMinter(nextBurner)).should.be.false;
    (await this.token.isAdmin(nextBurner)).should.be.false;

    const minting = await this.token.burn(amount, someone, { from: nextBurner });

    await expectEvent(minting, "Burned", {
      amount: amount.toString(),
      requester: nextBurner,
      target: someone
    });

    truffleAssert.fails(this.token.mint(amount, someone, { from: nextBurner }));
  })

  it("does not allow someone random to add minters or burners", async () => {
    (await this.token.isBurner(nextBurner)).should.be.false;
    (await this.token.isMinter(nextMinter)).should.be.false;
    (await this.token.isAdmin(someone)).should.be.false;

    truffleAssert.fails(this.token.addMinter(nextMinter, { from: someone }));
    (await this.token.isMinter(nextMinter)).should.be.false;

    truffleAssert.fails(this.token.addBurner(nextBurner, { from: someone }));
    (await this.token.isBurner(nextBurner)).should.be.false;
  })
  
  it("only allows admins to remove minters", async () => {
    (await this.token.isMinter(nextMinter)).should.be.false;
    
    (await this.token.isAdmin(someone)).should.be.false;
    (await this.token.isAdmin(creator)).should.be.true;

    await this.token.addMinter(nextMinter, { from: creator });
    (await this.token.isMinter(nextMinter)).should.be.true;

    truffleAssert.fails(this.token.removeMinter(nextMinter, { from: someone }));
    (await this.token.isMinter(nextMinter)).should.be.true;

    await this.token.removeMinter(nextMinter, { from: creator });
    (await this.token.isMinter(nextMinter)).should.be.false;
  })

  it("only allows admins to remove burners", async () => {
    (await this.token.isBurner(nextBurner)).should.be.false;
    
    (await this.token.isAdmin(someone)).should.be.false;
    (await this.token.isAdmin(creator)).should.be.true;

    this.token.addBurner(nextBurner, { from: creator });
    (await this.token.isBurner(nextBurner)).should.be.true;

    truffleAssert.fails(this.token.removeBurner(nextBurner, { from: someone }));
    (await this.token.isBurner(nextBurner)).should.be.true;

    await this.token.removeBurner(nextBurner, { from: creator });
    (await this.token.isBurner(nextBurner)).should.be.false;
  })

});
