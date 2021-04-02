import React, { useState } from "react";
import { ethers } from "ethers";
import { API_TOKENS } from "../Const";

export function Mint({contract, totalSupply, account}) {

  const getPrice = () => {
    if(totalSupply < 31) {
      return "0.01";
    } else if (totalSupply < 61) {
      return "0.02";
    } else if (totalSupply < 91) {
      return "0.05";
    } else {
      return "0.1";
    }
  }

  const handleClick = async () => {
    const tx = await contract.mint({value: ethers.utils.parseEther(getPrice())});
    const receipt = await tx.wait();
    const tokenId = receipt.events[0].args[2].toString();
    
    const rawResponse = await fetch(API_TOKENS, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({address: account, tokenId: parseInt(tokenId)})
    });
    const content = await rawResponse.json();
    console.log(content); // {message: "Created."}

    receipt.status === 0 && console.log("Transaction failed");
    window.dispatchEvent(new CustomEvent("balanceChanged"));
  }

  return (
    <div className="p-4">
      <button className="btn btn-primary" onClick={handleClick}>
        Mint
      </button>
    </div>
  );
}