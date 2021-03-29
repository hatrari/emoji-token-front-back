import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { Contract } from "./contract/Contract";

import ContractJson from "./contract/Token.json";

const CHAIN_ID = 1337; // LOCALHOST

function App() {
  const [chainId, setChainId] = useState();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();

  const init = async () => {
    if(!window.ethereum) return;
    let _chainId = await window.ethereum.request({ method: 'eth_chainId', });
    parseInt(_chainId) === CHAIN_ID && setChainId(parseInt(_chainId));
    window.ethereum.on('chainChanged', () => window.location.reload());
  }

  const handleConnectClick = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    accounts[0] && setAccount(accounts[0]);
    window.ethereum.on('accountsChanged', () => window.location.reload());
    initializeContract();
  }

  const initializeContract = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let _contract = new ethers.Contract(
      ContractJson.address,
      ContractJson.abi,
      provider.getSigner(0)
    );
    _contract && setContract(_contract);
  }

  useEffect(() => init(), []);

  if(!window.ethereum || !window.ethereum.isMetaMask) {
    return (
      <div className="container p-4">
        No Ethereum wallet was detected. <br />
        Please install <a href="http://metamask.io">MetaMask</a>.
      </div>
    );
  }

  if(!chainId) {
    return (
      <div className="container p-4">
        Please connect to localhost.
      </div>
    );
  }

  if(!account) {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 p-4 text-center">
            <p>Please connect to your wallet.</p>
            <button
              className="btn btn-warning"
              type="button"
              onClick={handleConnectClick}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if(!contract) {
    return (
      <div>Contract loading...</div>
    );
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12">
          <Contract contract={contract} account={account} />
        </div>
      </div>
    </div>
  );
}

export default App;