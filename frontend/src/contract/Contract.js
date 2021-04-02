import React, { useState, useEffect } from "react";

import { Mint } from "./Mint";
import { ListTokens } from "./ListTokens";

export function Contract({contract, account}) {
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    const init = async () => {
      let _name = await contract.name();
      let _symbol = await contract.symbol();
      let _balance = await contract.balanceOf(account);
      let _totalSupply = await contract.totalSupply();
      setName(_name);
      setSymbol(_symbol);
      setBalance(parseInt(_balance));
      setTotalSupply(parseInt(_totalSupply));
      window.addEventListener("balanceChanged", init);
    }
    init();
  }, [contract, account]);

  return (
    <>
    <div className="p-4">
      {name && <div>Name : <b>{name}</b></div>}
      {symbol && <div>Symbol : <b>{symbol}</b></div>}
      {symbol && <div>Balance : <b>{balance} {symbol}</b></div>}
      {symbol && <div>Total Supply : <b>{totalSupply} {symbol}</b></div>}
      <div>Account : <b>{account}</b></div>
    </div>
    <Mint contract={contract} totalSupply={totalSupply} account={account} />
    <ListTokens account={account} />
    </>
  );
}