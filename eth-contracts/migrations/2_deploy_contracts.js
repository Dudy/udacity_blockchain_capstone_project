// migrating the appropriate contracts
const SquareVerifier = artifacts.require("./SquareVerifier.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
    await deployer.deploy(SquareVerifier);
    const squareVerifierInstance = await SquareVerifier.deployed();

    await deployer.deploy(SolnSquareVerifier, squareVerifierInstance.address);
    await SolnSquareVerifier.deployed();
};
