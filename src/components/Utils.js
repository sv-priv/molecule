import { moleculeContractAddress, networks } from "./Constants"

function connectWallet(networkName) {
  console.log("connecting to wallet.......")
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        ...networks[networkName],
      },
    ],
  })
}
export { connectWallet }
