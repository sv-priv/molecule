import { moleculeContractAddress, networks } from "./Constants"

async function connectWallet(networkName) {
  console.log("connecting to wallet.......")
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        ...networks[networkName],
      },
    ],
  })
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  })
  const walletAddress = accounts[0]
  localStorage.setItem("userAddress", walletAddress)
}
export { connectWallet }
