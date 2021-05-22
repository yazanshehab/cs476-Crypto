//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



contract TLToken{
  address public owner = msg.sender;
  string name;
  string symbol;
  uint256 decimal;
  string zft;
  address private _owner;
  address public minter;
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
  event Sent(address from, address to, uint amount);
  mapping (address => uint256) public balances;

constructor () public{
        name = "TLToken";
        symbol = "TL";
        decimal = 0;
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
function _msgSender() public view returns (address) {
        return msg.sender;
    }

function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }
function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
function balance(address account) public view returns (uint256) {
        return balances[account];
    }
modifier restricted() {
    require(msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function sendFrom(address sender, address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[sender] -= amount;
        balances[receiver] += amount;
        emit Sent(sender, receiver, amount);
    }
  
}
    
