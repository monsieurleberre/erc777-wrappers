pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/access/roles/MinterRole.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";


/**
 * @title Simple777Token
 * @dev Very simple ERC777 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` or `ERC777` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract MintableERC777Token is ERC777, MinterRole {

    //Addresses allowed to add/remove minters
    Roles.Role private _admins;
    Roles.Role private _burners;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor (string memory name, string memory symbol)
    public ERC777(name, symbol, new address[](0)) {
        _admins.add(msg.sender);
    }

    /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount, bytes memory userData, bytes memory operatorData)
    public onlyMinter
    returns (bool) {
        _mint(msg.sender, account, amount, userData, operatorData);
        return true;
    }
}
