pragma solidity ^0.5.0;

import "./MintableERC777Token.sol";


/**
 * @title Simple777Token
 * @dev Very simple ERC777 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` or `ERC777` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract WrappedXRP is MintableERC777Token {

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public MintableERC777Token("Trakx Wrapped XRP", "wXRP") {}
}
