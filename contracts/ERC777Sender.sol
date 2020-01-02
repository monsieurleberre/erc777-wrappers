pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC777/IERC777.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/introspection/ERC1820Implementer.sol";
import "openzeppelin-solidity/contracts/token/ERC777/IERC777Sender.sol";

contract ERC777Sender is IERC777Sender, ERC1820Implementer {

    bytes32 public TOKEN_SENDER_INTERFACE_HASH;

    constructor (bytes32 tokenSenderHash) public {
        TOKEN_SENDER_INTERFACE_HASH = tokenSenderHash;
    }

    event TokensSent(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    function senderFor(address account) public {
        _registerInterfaceForAddress(TOKEN_SENDER_INTERFACE_HASH, account);
    }

    function tokensToSend(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {

        emit TokensSent(operator, from, to, amount, userData, operatorData);
    }
}