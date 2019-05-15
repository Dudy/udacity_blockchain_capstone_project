// inspired by https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js

const fs = require('fs');
const MNEMONIC = fs.readFileSync('.secret').toString().trim();
const INFURA_KEY = '019b1fc1d82f42498b43174aff1f2b9c';
const OWNER_ADDRESS = '0x549503d7d00278cbb3a06d998baDa8B035F491a3';
const NFT_CONTRACT_ADDRESS = '0x475A6910d069FD2222Bc8C1608cAB17F6DA1b333';
const NETWORK = 'rinkeby';

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require('web3');
const NUM_TOKENS = 10;

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.");
    return;
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }];

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`);
    const web3Instance = new web3(
        provider
    );

    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" });

    // Tokens issued directly to the owner.
    for (var i = 0; i < NUM_TOKENS; i++) {
        const result = await nftContract.methods.mint(
            OWNER_ADDRESS,
            i,
            'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/' + i
        ).send({ from: OWNER_ADDRESS });

        console.log("Minted token. Transaction: " + result.transactionHash);
    }
}

main();
