require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    local: {
      url: 'http://localhost:8545'
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/A1XT2JXotvIJju1MyWalb_-d15YNeRhX',
      accounts: [
        `0x${"875cb80ebe97e9e8086f3be15a7239a5c90bfa5d345ed070c0b496850c4b9902"}`,
      ],
    },

  }
};
