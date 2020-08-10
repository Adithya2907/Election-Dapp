const compiledContract = require("./build/Election.json");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from : ${accounts[0]}`);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface)
  )
    .deploy({ data: compiledContract.bytecode })
    .send({ from: accounts[0], gas: "3000000" });

  const address = await result.options.address;

  console.log(`Contract deployed to : ${address}`);
};

deploy();
