export function Mint({contract}) {

  const handleClick = async () => {
    const tx = await contract.mint();
    const receipt = await tx.wait();
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