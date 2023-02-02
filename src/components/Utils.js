import { moleculeContractAddress, networks } from "./Constants"

function connectWallet(networkName) {
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
