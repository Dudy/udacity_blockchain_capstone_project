var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', async function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i = 0; i < 5; i++) {
                await this.contract.mint(accounts[i], i, 'token_' + i);
            }
            await this.contract.mint(accounts[4], 5, 'token_5');
        });

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 6, "invalid total supply");
        });

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_one);
            assert.equal(balance, 1, "invalid balance");

            balance = await this.contract.balanceOf(accounts[4]);
            assert.equal(balance, 2, "invalid balance");
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenUri = await this.contract.tokenURI(3);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", "invalid tokenURI");
        });

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 0, { from: account_one });
            let owner = await this.contract.ownerOf(0);
            assert.equal(owner, account_two, "wrong ownership");
        });
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        });

        it('should fail when minting when address is not contract owner', async function () { 
            let errorFree = true;
            try {
                await this.contract.mint(account_one, 0, 'token_0', { from: account_two });
            } catch(e) {
                assert.equal(e.reason, "caller is not the owner", "wrong exception occurred");
                errorFree = false;
            }
            assert.equal(errorFree, false, "Minting attemp did not threw an expected error");
        });

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "wrong contract owner");
        });
    });
})