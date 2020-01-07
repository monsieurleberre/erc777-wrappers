pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/GSN/Context.sol";

/**
 * @title SupervisedToken
 * @dev Base class offering modifiers to validate operations on the token inheriting from it.
 * The intent to have segregated roles for operations commonly performed on tokens.
 **/
contract SupervisedToken is Context {

    using Roles for Roles.Role;

    //Addresses allowed to add/remove minters
    Roles.Role private _admins;
    Roles.Role private _minters;
    Roles.Role private _burners;

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor () public {
        _admins.add(_msgSender());
        addMinter(_msgSender());
        addBurner(_msgSender());
    }

    // maybe need a superadmin if we want to be able to add remove admins
    // event AdminAdded(address indexed account, address indexed requester);
    // event AdminRemoved(address indexed account, address indexed requester);

    event MinterAdded(address indexed account, address indexed requester);
    event MinterRemoved(address indexed account, address indexed requester);

    event BurnerAdded(address indexed account, address indexed requester);
    event BurnerRemoved(address indexed account, address indexed requester);

    modifier onlyAdmins() {
        require(_admins.has(_msgSender()), "Caller does not have the admin role");
        _;
    }

    modifier onlyMinters() {
        require(_minters.has(_msgSender()), "Caller does not have the minter role");
        _;
    }

    modifier onlyBurners() {
        require(_burners.has(_msgSender()), "Caller does not have the burner role");
        _;
    }

    function isAdmin(address addressToTest) public view returns (bool) {
        return _admins.has(addressToTest);
    }

    function isMinter(address addressToTest) public view returns (bool) {
        return _minters.has(addressToTest);
    }

    function isBurner(address addressToTest) public view returns (bool) {
        return _burners.has(addressToTest);
    }

    function addMinter(address addressToAdd) public onlyAdmins {
        require(!_minters.has(addressToAdd),"Specified address is already a minter.");
        _minters.add(addressToAdd);
        emit MinterAdded(addressToAdd, _msgSender());
    }

    function addBurner(address addressToAdd) public onlyAdmins {
        require(!_burners.has(addressToAdd),"Specified address is already a minter.");
        _burners.add(addressToAdd);
        emit BurnerAdded(addressToAdd, _msgSender());
    }

    function removeMinter(address addressToRemove) public onlyAdmins {
        require(_minters.has(addressToRemove),"Specified address is not a burner.");
        _minters.remove(addressToRemove);
        emit MinterRemoved(addressToRemove, _msgSender());
    }

    function removeBurner(address addressToRemove) public onlyAdmins {
        require(_burners.has(addressToRemove),"Specified address is not a burner.");
        _burners.remove(addressToRemove);
        emit BurnerRemoved(addressToRemove, _msgSender());
    }
}
