import web3 from "./web3";
import CompiledContract from "./build/Election.json";

const instance = new web3.eth.Contract(
  JSON.parse(CompiledContract.interface),
  "0xBa6C01c1a3427ebBb1f1fcB8CcB4D8f72794A21F"
);
export default instance;
