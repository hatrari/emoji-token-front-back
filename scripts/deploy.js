const { ethers } = require("hardhat");

async function main() {
  // ERC721
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("My Token", "MTK", "uri/");
  console.log("ERC721 deployed at: ", token.address);
}

main();