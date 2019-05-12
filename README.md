------------------------------------------------------------------------------------------------------------------------------------------------------------

# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Rinkeby Deployment

$ truffle migrate --network rinkeby

[...]

Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x6ad2dd


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xa64185abe253c26412ca85ce3db7185c95f783f6861ce774eb652aea7b864d13
   > Blocks: 0            Seconds: 8
   > contract address:    0x918916d9cA87D195e355B3468B10C5DC00BE877a
   > block number:        4367564
   > block timestamp:     1557642930
   > account:             0x549503d7d00278cbb3a06d998baDa8B035F491a3
   > balance:             1.91276078
   > gas used:            273162
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00546324 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00546324 ETH


2_deploy_contracts.js
=====================

   Deploying 'SquareVerifier'
   --------------------------
   > transaction hash:    0x480b0d9a72feca384ed2581bd519a556c68f2ddd30639b9320aef456175b507d
   > Blocks: 0            Seconds: 12
   > contract address:    0x46ec3D3d1FbbE95C5692b39E5fd62Bc39a7f7470
   > block number:        4367566
   > block timestamp:     1557642960
   > account:             0x549503d7d00278cbb3a06d998baDa8B035F491a3
   > balance:             1.87642154
   > gas used:            1774934
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03549868 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xe9f4e0038a02d5bcbda9018f50fe270021bcef30d20a26e14f18f777378ad2ed
   > Blocks: 0            Seconds: 8
   > contract address:    0x475A6910d069FD2222Bc8C1608cAB17F6DA1b333
   > block number:        4367567
   > block timestamp:     1557642975
   > account:             0x549503d7d00278cbb3a06d998baDa8B035F491a3
   > balance:             1.78829936
   > gas used:            4406109
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.08812218 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.12362086 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.1290841 ETH

