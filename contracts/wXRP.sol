pragma solidity ^0.5.0;

import "./ERC777Token.sol";
import "./ERC777Sender.sol";
import "./ERC777Recipient.sol";

contract TrakxWrappedXRP is ERC777Token {

    string public constant name = "Trakx Wrapped XRP";
    string public constant symbol = "wXRP";
    uint public INITIAL_SUPPLY = 0;

    constructor() public ERC777Token(name, symbol, msg.sender, [msg.sender], [msg.sender]) {

    }
}

contract TrakxWrappedXRPSender is ERC777Sender {
    constructor () public ERC777Sender(keccak256("Trakx Wrapped XRP - wXRP - 0.1.0 - Sender")) {}
}

contract TrakxWrappedXRPRecipient is ERC777Recipient {
    constructor (address tokenAddress) public ERC777Sender(
        tokenAddress,
        keccak256("Trakx Wrapped XRP - wXRP - 0.1.0 - Recipient")
    ) {}
}