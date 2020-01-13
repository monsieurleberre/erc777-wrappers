pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "./SupervisedToken.sol";

/**
 * @title Simple777Token
 * @dev Very simple supervised ERC777 Token example, where no tokens are pre-assigned.
 * Tokens need to be minted by an authorised address, and can then be circulated as usual
 * through classic `ERC20` or `ERC777` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract SupervisedERC777Token is ERC777, SupervisedToken {

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor (string memory name,
                string memory symbol)
                public ERC777(name, symbol, _senderAsArray()) { }

    /**
     * Requirements:
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount, bytes memory userData, bytes memory operatorData)
    public onlyMinters
    returns (bool) {
        _mint(msg.sender, account, amount, userData, operatorData);
        return true;
    }

    /**
        Only used once at creation to pass the contract creator as the default operator.
     */
    function _senderAsArray() private returns (address[] memory) {
        address[] memory array = new address[](1);
        array[0] = msg.sender;
    }
}
