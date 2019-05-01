// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier





var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('test scenario description', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new({from: account_one});

            // TODO: some more per test initialization
        })

        it('a new solution can be added', async function () { 
            
        })

        it('an ERC721 token can be minted', async function () { 
            
        })
    });
})
