pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

/**
 * @title ERC777Recipient
 * @dev Very simple ERC777 Recipient
 */
contract ERC777Recipient is IERC777Recipient {

    //cf. https://etherscan.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24#code
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");

    IERC777 private _token;

    event TokensReceived(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    constructor (address token) public {
        _token = IERC777(token);

        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {
        require(msg.sender == address(_token), "ERC777Recipient: Invalid token");

        // do stuff
        emit TokensReceived(operator, from, to, amount, userData, operatorData);
    }
}