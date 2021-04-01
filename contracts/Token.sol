// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Token is Context, AccessControlEnumerable, ERC721Enumerable, ERC721Burnable, ERC721Pausable {
  using Counters for Counters.Counter;

  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

  Counters.Counter private _tokenIdTracker;

  string private _baseTokenURI;

  constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

    _setupRole(PAUSER_ROLE, _msgSender());
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function mint() public payable returns(uint256) {
    uint256 currentSupply = totalSupply();
    require(currentSupply < 111, "Token: the limited number of tokens has been reached");
    uint256 price;
    if(currentSupply < 31) {
      price = 0.01 ether;
    } else if (currentSupply < 61) {
      price = 0.02 ether;
    } else if (currentSupply < 91) {
      price = 0.05 ether;
    } else {
      price = 0.1 ether;
    }
    require(msg.value == price, "Token: Amount of Ether sent is not correct");
    _tokenIdTracker.increment();
    uint256 tokenId = _tokenIdTracker.current();
    _mint(_msgSender(), tokenId);
    return tokenId;
  }

  function pause() public virtual {
    require(hasRole(PAUSER_ROLE, _msgSender()), "Token: must have pauser role to pause");
    _pause();
  }

  function unpause() public virtual {
    require(hasRole(PAUSER_ROLE, _msgSender()), "Token: must have pauser role to unpause");
    _unpause();
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
      super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerable, ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function withdraw() public {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Token: must have admin role to withdraw");
    uint balance = address(this).balance;
    (bool sent, ) = _msgSender().call{value: balance}("");
    require(sent, "Failed to send Ether");
  }
}