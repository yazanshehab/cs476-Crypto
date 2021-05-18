//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../node_modules/@openzeppelin/access/Ownable.sol";


contract TLToken is ERC20, Ownable {
  event Mint(address indexed to, uint256 amount);
  event MintFinished();
bool public mintingFinished = false;
modifier canMint() {
    require(!mintingFinished);
    _;
  }
modifier hasMintPermission() {
    require(msg.sender == owner);
    _;
  }
function mint(address account, uint256 amount) public onlyOwner returns (bool){
        _mint(account, amount);
        return true;
    }
function finishMinting() public onlyOwner canMint returns (bool) {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }
} 
    string name;
    string symbol;
    uint256 decimal;

constructor(){
    name = "E-commerce";
    symbol = "TL";
    decimal = 0;
    }
      
}