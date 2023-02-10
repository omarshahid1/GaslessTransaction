// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/Context.sol";


contract SimpleNFT is ERC721, ERC2771Context {
        
    // Variables
    uint tokenId;

    // Mappings
    mapping(address => uint) public amountOfNFTs; 

    // Events
    event NFTMinted();
    
    // Constructor
    constructor(MinimalForwarder forwarder) ERC721("OmarNFT", "ONFT")
    ERC2771Context(address(forwarder)) {} 


    // Functions
    function mintNFT() external {
                
        amountOfNFTs[_msgSender()] = tokenId++;
        _safeMint(_msgSender(), tokenId);

        emit NFTMinted();
    }

    function _msgSender() internal view virtual override(ERC2771Context, Context) returns (address sender) {        
        return super._msgSender();        
    }

    function _msgData() internal view virtual override(ERC2771Context, Context) returns (bytes calldata) {        
        return super._msgData();        
    }    
    
}