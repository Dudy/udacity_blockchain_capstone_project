// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier





var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

var proof = {
	"proof":
	{
		"A":["0x02662c0b34cf4141d16cfb3114ca0134ebb9342502a3dc8493da23133dc1f852", "0x16849f99592c051645ec65fa3db5af8e40f189e7d19ed5b5230c312204a84118"],
		"A_p":["0x2d98740f4324eee060058c2613f70ce9c2a5c2e69226fe1a879a4c75d0940024", "0x25bd13f79fcb6dcf4d3eae17d5dcee7205d02dcc22e2c83603dbd7fd81168465"],
		"B":
			[["0x11874525522bd5bb3b5ef124875f4b6623e47ade646c2f8f68ef8f8cf0e7e69c", "0x02d9a4a66ab861d0cea36c8ffc8ca4b42cd4798fadb25cc21a87fbc59a197508"], ["0x13de42e91a8cacbee93235ca8aff408e9e6b3e21b11710d70373bfb680dc28ba", "0x2df241e74cfbdd33f23b888269894321f139f3760dc40367d36f940d4908370c"]],
		
		"B_p":["0x078ce4bd47d92dfc040fec3fffdd2281cf82642ce62f7cf664704f0c8131241c", "0x0ca382f0e2b9a957c0a873c9d27c00b0c1e105f7cf2816c6bb52679638578fd7"],
		"C":["0x01015ee4e5c17621fcfc5114332ea54c2814cb1407e670f314af261161672a42", "0x1343d8c6b9cd95f18558506ccbc6ab2de499332e0f83eabd2f0ff1e20d13f7c0"],
		"C_p":["0x0946e7b68159f0cc011da5820fcc668a812666ddfd5a93676429ee41980f7627", "0x0b0dff2f08415edfdee47212ef8dd73819c5678c01af34c227523f55520c7add"],
		"H":["0x10192a76a9316a65d4e5d7dc2e0272e2a1c39b4c5ca629e1b2456a70b3b1801f", "0x2b43ec9adcc05785e2cb065cd250f2e2ca652d6295a87537c3610f63d329c2e0"],
		"K":["0x2a0aa985b238cb2fcd74ca011b6c6f1e3dd550798a63a51b0e7a1389f2a79cf2", "0x1a7f8e55ccef465bc3ef210cc01d52ff424a45ccb6d18cdd2532e1dc44fc6ee2"]
	},
	"input":[0000000000000000000000000000000000000000000000000000000000000004,0000000000000000000000000000000000000000000000000000000000000001]
};

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('test scenario description', function () {
        beforeEach(async function () {
            this.verifierContract = await SquareVerifier.new({ from: account_one });
            this.contract = await SolnSquareVerifier.new(this.verifierContract.address, { from: account_one });
        })

        it('a new solution can be added', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log('total supply: %s', totalSupply);
            assert.equal(totalSupply, 0, "invalid total supply");

            let balance = await this.contract.balanceOf(account_one);
            console.log('balance account_one: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            balance = await this.contract.balanceOf(account_two);
            console.log('balance account_two: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            let tokenId = 1;
            let tokenAddress = account_two;
            await this.contract.solnSquareMint(
                proof.proof.A,
                proof.proof.A_p,
                proof.proof.B,
                proof.proof.B_p,
                proof.proof.C,
                proof.proof.C_p,
                proof.proof.H,
                proof.proof.K,
                proof.input,
                tokenId,
                tokenAddress,
                { from: account_one });

            totalSupply = await this.contract.totalSupply();
            console.log('total supply: %s', totalSupply);
            assert.equal(totalSupply, 1, "invalid total supply");

            balance = await this.contract.balanceOf(account_one);
            console.log('balance account_one: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            balance = await this.contract.balanceOf(account_two);
            console.log('balance account_two: %s', balance);
            assert.equal(balance, 1, "invalid balance");
        })

        it('an ERC721 token can be minted', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log('total supply: %s', totalSupply);
            assert.equal(totalSupply, 0, "invalid total supply");

            let balance = await this.contract.balanceOf(account_one);
            console.log('balance account_one: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            balance = await this.contract.balanceOf(account_two);
            console.log('balance account_two: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            let tokenId = 1;
            let tokenAddress = account_two;
            await this.contract.mint(
                tokenAddress,
                tokenId,
                "somewhereOverTheRainbow",
                { from: account_one });

            totalSupply = await this.contract.totalSupply();
            console.log('total supply: %s', totalSupply);
            assert.equal(totalSupply, 1, "invalid total supply");

            balance = await this.contract.balanceOf(account_one);
            console.log('balance account_one: %s', balance);
            assert.equal(balance, 0, "invalid balance");

            balance = await this.contract.balanceOf(account_two);
            console.log('balance account_two: %s', balance);
            assert.equal(balance, 1, "invalid balance");
        })
    });
})
