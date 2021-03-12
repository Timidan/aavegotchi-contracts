/* global task ethers */
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('hardhat-contract-sizer')
require('dotenv').config()
require('solidity-coverage')
require('./tasks/generateDiamondABI.js')

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  networks: {
    kovan: {
      url:"https://kovan.infura.io/v3/08db7d408b3345f6a0e1184f99df770d",
      accounts: ['0xdb931058a6a27a37f82003683b69daf5a479370e37869837ef1d77871a1f617f'],
      gasPrice: 5000000000
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: false
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: true
  },
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: '0.8.1',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
