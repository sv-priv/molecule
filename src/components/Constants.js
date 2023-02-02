const moleculeContractAddress = "TODO"

const networks = {
  goerli: {
    chainId: "0x5",
    chainName: "Goerli",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.blockpi.network/v1/rpc/public"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
  mainnet: {
    chainId: `1`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth.llamarpc.com"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
}
export { moleculeContractAddress, networks }
