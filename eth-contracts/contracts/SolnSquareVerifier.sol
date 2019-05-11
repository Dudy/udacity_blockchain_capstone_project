pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './SquareVerifier.sol';
import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    SquareVerifier private squareVerifier;

    constructor(address squareVerifierAddress) public {
        squareVerifier = SquareVerifier(squareVerifierAddress);
    }

// TODO define a solutions struct that can hold an index & an address
    struct solution {
        uint tokenId;
        address tokenAddress;
        bool used;
    }

// TODO define an array of the above struct
    solution[] private solutions;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => solution) private uniqueSolutions;

// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint tokenId, address tokenAddress);

// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint tokenId, address tokenAddress) internal {
        solution memory s = solution({tokenId: tokenId, tokenAddress: tokenAddress, used: true});
        emit SolutionAdded(tokenId, tokenAddress);
        solutions.push(s);
        uniqueSolutions[hash(tokenId, tokenAddress)] = s;
    }

    modifier uniqueSolution(uint tokenId, address tokenAddress) {
        require(!uniqueSolutions[hash(tokenId, tokenAddress)].used, "solution is not unique");
        _;
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
    function solnSquareMint(uint[2] memory a,
                            uint[2] memory a_p,
                            uint[2][2] memory b,
                            uint[2] memory b_p,
                            uint[2] memory c,
                            uint[2] memory c_p,
                            uint[2] memory h,
                            uint[2] memory k,
                            uint[2] memory input,
                            uint tokenId,
                            address tokenAddress) public uniqueSolution(tokenId, tokenAddress) returns(bool) {
//  - make sure you handle metadata as well as tokenSuplly
        require(squareVerifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "provided proof not valid");
        addSolution(tokenId, tokenAddress);
        return mint(tokenAddress, tokenId, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
    }

    function hash(uint tokenId, address tokenAddress) internal returns(bytes32) {
        return keccak256(abi.encodePacked(tokenId, tokenAddress));
    }
}
