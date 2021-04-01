import { ethers } from "ethers";

export function Mint({contract, totalSupply}) {

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
    receipt.status === 0 && console.log("Transaction failed");
    window.dispatchEvent(new CustomEvent("balanceChanged"));
    const uri = await contract.tokenURI(1);
    console.log(uri);
  }

  return (
    <div className="p-4">
      <button className="btn btn-primary" onClick={handleClick}>
        Mint
      </button>
    </div>
  );
}