pragma solidity ^0.5.0;

import "./ERC777Token.sol";
import "./ERC777Sender.sol";
import "./ERC777Recipient.sol";

contract TrakxWrappedXRP is ERC777Token {

    constructor() public ERC777Token(
        "Trakx Wrapped XRP",
        "wXRP") {}
}

contract TrakxWrappedXRPSender is ERC777Sender {
    constructor () public ERC777Sender(keccak256("Trakx Wrapped XRP - wXRP - 0.1.0 - Sender")) {}
}

contract TrakxWrappedXRPRecipient is ERC777Recipient {
    constructor (address tokenAddress) public ERC777Recipient(
        tokenAddress,
        keccak256("Trakx Wrapped XRP - wXRP - 0.1.0 - Recipient")
    ) {}
}