pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "./SupervisedToken.sol";

/**
 * @title Simple777Token
 * @dev Very simple ERC777 Token example, where no tokens are pre-assigned.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` or `ERC777` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract MintableERC777Token is ERC777, SupervisedToken {


    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor (string memory name,
                string memory symbol)
                public ERC777(name, symbol, new address[](0)) { }

    /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount, bytes memory userData, bytes memory operatorData)
    public onlyMinters
    returns (bool) {
        _mint(msg.sender, account, amount, userData, operatorData);
        return true;
    }
}
