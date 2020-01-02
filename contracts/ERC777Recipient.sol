pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC777/IERC777.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/token/ERC777/IERC777Recipient.sol";

/**
 * @title ERC777Recipient
 * @dev Very simple ERC777 Recipient
 */
contract ERC777Recipient is IERC777Recipient {

    //cf. https://etherscan.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24#code
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 private TOKEN_RECIPIENT_INTERFACE_HASH;

    IERC777 private _token;

    event TokensReceived(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    constructor (address token, bytes32 tokenRecipientHash) public {
        _token = IERC777(token);
        TOKEN_RECIPIENT_INTERFACE_HASH = tokenRecipientHash;

        _erc1820.setInterfaceImplementer(address(this), TOKEN_RECIPIENT_INTERFACE_HASH, address(this));
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