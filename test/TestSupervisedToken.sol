pragma solidity ^0.5.0;

import "../contracts/SupervisedToken.sol";

contract TestSupervisedToken is SupervisedToken {

    event Minted(uint256 amount, address target, address indexed requester);
    event Burned(uint256 amount, address target, address indexed requester);

    function mint(uint256 amount, address target)
    public onlyMinters {
        emit Minted(amount, target, msg.sender);
    }

    function burn(uint256 amount, address target)
    public onlyBurners {
        emit Burned(amount, target, msg.sender);
    }
}