const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
  it("Test #1", async function() {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy("My Token", "MTK", "https://ha-api-emoji.herokuapp.com/icons/");

    for(let i=0; i<31; i++) {
      await token.mint({value: ethers.utils.parseEther("0.01")});
      console.log(i);
    }
    
    for(let i=0; i<30; i++) {
      await token.mint({value: ethers.utils.parseEther("0.02")});
      console.log(i);
    }

    for(let i=0; i<30; i++) {
      await token.mint({value: ethers.utils.parseEther("0.05")});
      console.log(i);
    }

    for(let i=0; i<20; i++) {
      await token.mint({value: ethers.utils.parseEther("0.1")});
      console.log(i);
    }

    expect(await token.totalSupply()).to.equal(111);
  });
});