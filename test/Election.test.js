const Web3 = require('web3')
const assert = require('assert')
const web3 = new Web3('HTTP://127.0.0.1:7545')

const compiledContract = require('../ethereum/build/Election.json')

let accounts;
let election;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    election = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({ data: compiledContract.bytecode})
        .send({ from: accounts[0], gas: 3000000})


})

describe('Election', () => {
    it('the contract is created', () => {
        assert.ok(election.options.address);
    })

    it('the manager is correctly assigned', async () => {
        const manager = await election.methods.manager().call()
        assert.equal(accounts[0], manager);
    })

    it('only manager can declare results', async () => {
        try {
            await election.methods.declareResults().send({ from: accounts[1] })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it('allows one candidate to contest', async () => {
        await election.methods.contestInElection().send({ from : accounts[1], gas: '1000000'})
        const candidatesCount = await election.methods.candidatesCount().call()

        assert.equal(1, candidatesCount.length)
    })

    it('fails if already in election', async () => {
        await election.methods.contestInElection().send({ from : accounts[1], gas: '1000000'})
        try {
            await election.methods.contestInElection().send({ from: accounts[1], gas: '1000000'})
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it("fails if not campaign day", async() => {
        await election.methods.endCampaign().send({ from: accounts[0], gas: '1000000'})
        try {
            await election.methods.contestInElection().send({ from: accounts[1], gas: '1000000'})
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it("right vote count is stored", async() => {
        await election.methods.contestInElection().send({ from: accounts[1], gas: '1000000'})

        const candidate = await election.methods.candidates(accounts[1]).call()
        const voteCount = candidate.candidateVoteCount

        assert.equal(0, voteCount);
    })
    
    it('fails if already in election', async () => {
        await election.methods.registerAsVoter().send({ from : accounts[1], gas: '1000000'})
        try {
            await election.methods.registerAsVoter().send({ from: accounts[1], gas: '1000000'})
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it("fails if not campaign day", async() => {
        await election.methods.endCampaign().send({ from: accounts[0], gas: '1000000'})
        try {
            await election.methods.registerAsVoter().send({ from: accounts[1], gas: '1000000'})
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it("right vote count is stored", async() => {
        await election.methods.registerAsVoter().send({ from: accounts[1], gas: '1000000'})

        const result = await election.methods.votersList(accounts[1]).call()

        assert.equal(true, result);
    })


})

