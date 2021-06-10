const config = require("dotenv").config();
const Web3 = require("web3");
const Tx = require("@ethereumjs/tx").Transaction;
const contractAbi = require("./contractAbi.json");

const web3 = new Web3(config.parsed.GANACHE_URL);

const SimpleStorageContract = new web3.eth.Contract(contractAbi, config.parsed.CONTRACT_ADDRESS);
const accountPrivateKey = Buffer.from(config.parsed.ACCOUNT_PRIVATE_KEY, 'hex');
const data = SimpleStorageContract.methods.setData(123456789).encodeABI();

web3.eth.getTransactionCount(config.parsed.ACCOUNT_ADDRESS)
  .then(nonce => {
    const tx = new Tx({
      nonce: nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x27511',
      to: config.parsed.CONTRACT_ADDRESS,
      value: 0,
      data: data
    });
    const signedTx = tx.sign(accountPrivateKey);

    const serializedTx = signedTx.serialize();

    web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      .on('receipt', console.log);
  });