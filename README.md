# Election-Dapp

Created a complete Decentralized Election application from scratch using Ethereum blockchain.

## Tech stack

#### Back-end

- Node.js

#### Front-end

- React JS
- Next.js
- Semantic UI

#### Smart contracts

- Solidity
- Web3.js to compile and deploy the smart contracts

#### Testing

- JavaScript(Mocha)

The app requires the use of two other technologies:

- Metamask(to interact with the blockchain)
- Ganache (to deploy the blockchain to local network)

To deploy the app on a development blockchain, feel free to use Infura.

Clone the app, and run
`npm install`
to install all the dependencies.

Compile the script using `node ethereum/compile.js`

And deploy the script on ganache test network by running `node ethereum/deploy.js`. Make sure that your ganache is running when you use this command.

Copy the address, and replace it in the address file, and in the election.js file.

Run the command `npm run dev` and go to localhost:3002. Your Dapp is up and running!
