import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined")
  web3 = new Web3(window.web3.currentProvider);
else web3 = new Web3("HTTP://127.0.0.1:7545");

export default web3;
