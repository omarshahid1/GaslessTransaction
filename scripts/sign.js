const { ethers } = require('hardhat');
const { signMetaTxRequest } = require('../src/signer');
const { readFileSync, writeFileSync } = require('fs');


function getInstance(name) {
  const address = JSON.parse(readFileSync('deploy.json'))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main() {
  const forwarder = await getInstance('MinimalForwarder');
  console.log("forwarderrr", forwarder);
  const simpleNFT = await getInstance("SimpleNFT");
  console.log("simpleNFTTT", simpleNFT);

  const { NAME: name, PRIVATE_KEY: signer } = process.env;
  const from = new ethers.Wallet(signer).address;
  console.log("frommm", from);
  console.log(`Signing NFT minting from ${from}...`);
  const data = simpleNFT.interface.encodeFunctionData('mintNFT');
  console.log("dataaa", data);

  const result = await signMetaTxRequest(signer, forwarder, {
    to: simpleNFT.address, from, data });

  console.log("resulttt", result);
  
  writeFileSync('tmp/request.json', JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}