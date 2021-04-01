require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: {
        mnemonic: "record excuse try include danger agree much rapid globe drastic profit edit"
      }
    },
    rinkeby: {
			url: "https://rinkeby.infura.io/v3/93c484632ab74f578b0ab61b1a0e146c",
			accounts: {
				mnemonic: "record excuse try include danger agree much rapid globe drastic profit edit"
			}
		}
  }
};