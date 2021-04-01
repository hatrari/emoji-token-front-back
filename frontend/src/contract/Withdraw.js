export function Withdraw({contract}) {

  const handleClick = async () => {
    const tx = await contract.withdraw();
    const receipt = await tx.wait();
    receipt.status === 0 && console.log("Transaction failed");
  }

  return (
    <div className="p-4">
      <button className="btn btn-primary" onClick={handleClick}>
        Withdraw
      </button>
    </div>
  );
}