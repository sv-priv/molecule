import React, { useState, useEffect } from "react"
import "./Home.css"
import cryptoJS from "crypto-js"
import { create } from "ipfs-http-client"

import { ethers } from "ethers"

export default function User() {
  const [userAddress, setUserAddress] = useState()
  useState(null)

  const [cure, setCure] = useState(null)
  const [researcher, setResearcher] = useState(null)
  const [university, setUniversity] = useState(null)
  const [patentId, setPatentId] = useState(null)
  const [institution, setInstitution] = useState(null)
  const [brightlistAddress, setBrightlistAddress] = useState(null)
  const [revokeAddress, setRevokeAddress] = useState(null)

  const [encryptionKey, setEncryptionKey] = useState(null)

  const contractAddress = "0xe8c894d0b2e70d5ad03e66e7e5b31d24a96ae83a"
  const contractABI = [
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_addressToBrightlist",
          type: "address",
        },
      ],
      name: "addToBrightlist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "counter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_tokenURI", type: "string" }],
      name: "mintToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "owner", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_addressToRevoke", type: "address" },
      ],
      name: "revokeFromBrightlist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]

  const accounts = window.ethereum.request({ method: "eth_requestAccounts" })
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const walletAddress = accounts[0]

  const signer = provider.getSigner(walletAddress)
  const signerAddress = signer.getAddress()

  window.ethereum.on("accountsChanged", function (accounts) {
    setUserAddress(accounts[0])
    localStorage.setItem("userAddress", accounts[0])

    location.reload()
  })

  const moleculeContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  async function getTokenURI(tokenId) {
    const tokenURI = await moleculeContract.tokenURI(0)
    return tokenURI
  }

  async function addToBrightlist(e, address) {
    e.preventDefault()
    const whitelisted = await moleculeContract.addToBrightlist(address)
    console.log(whitelisted)
  }
  async function revokeFromBrightlist(e, address) {
    e.preventDefault()
    const removed = await moleculeContract.revokeFromBrightlist(address)
    console.log(removed)
  }

  useEffect(() => {
    const chainId = parseInt(window.ethereum.chainId)
    localStorage.setItem("chainId", chainId)
    setUserAddress(localStorage.getItem("userAddress"))
  }, [])

  function encrypt(contractData) {
    //get a random encrytion key
    let r = (Math.random() + 1).toString(36).substring(7)
    console.log("random", r)

    const ciphertext = cryptoJS.AES.encrypt(contractData, r)
    console.log("cipertext", ciphertext.toString())
    return ciphertext.toString()
  }

  async function decrypt() {}

  async function uploadToIpfs() {}

  async function showKey() {}

  async function mint(e, cure, researcher, university, patentId, institution) {
    e.preventDefault()
    console.log("minting.....")

    const mintObject = {
      researcher,
      university,
      patent_filed: {
        patentId,
        institution,
      },
    }
    //encrypt the data
    const stringMintObject = JSON.stringify(mintObject)

    const encryptedContractData = encrypt(stringMintObject)
    console.log("encrypted data", encryptedContractData)

    // put the ciphertext string to IPFS

    // eventually put put sensitive data in an env file
    const projectId = "2LCM7opw4FWtnPy0xOy0CLo3U1y"
    const projectSecret = "c1b3f41538aefb44572728ccbb83e9d9"

    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")
    console.log(auth)

    const ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    })

    const ipfsAddHashedObject = await ipfs.add(ciphertext.toString())
    console.log("ipfsAdded", ipfsAddHashedObject.path)

    //read from the contract what is the number of tokens, get the number of tokens + 1 and put it in the token name
    // contract.getNumberOfTokens()

    const tokenNumber = 0 //todo

    const tokenUri = {
      name: `token #${tokenNumber}`,
      description: `this token can cure ${cure}`,
      contractData: `ipfs://Qm${ipfsAddHashedObject.path}`,
    }

    const ipfsAddTokenURI = await ipfs.add(JSON.stringify(tokenUri))

    console.log("token uri", ipfsAddTokenURI.path)

    //  await moleculeContract.addToBrightlist(
    // //   signer.getAddress()
    // // )
    addToBrightlist(signerAddress)

    revoke
    await moleculeContract.mintToken(ipfsAddTokenURI.path)

    // contract.mint(tokenAddress, tokenUri.cid)

    // when is minted put the encryption key in localStorage alongside the tokenId and the owner address

    //one of the suggested things would be, build a backend and store them there not in local storage.
    // map every user address to the tokenID and the key

    const bytes = cryptoJS.AES.decrypt(ciphertext.toString(), r)
    const plaintext = bytes.toString(cryptoJS.enc.Utf8)
    console.log("plaintext", plaintext)

    const JSONEND = JSON.parse(plaintext)
    console.log("initial", JSONEND)

    //get the encryption key from somewhere
  }

  return (
    <div>
      <div className="container-md home-container">
        {window.ethereum ? (
          <div>
            <div>
              <h5>Brightlist an ethereum address</h5>
              <form>
                <input
                  type="text"
                  value={brightlistAddress || ""}
                  required
                  onChange={(e) => setBrightlistAddress(e.target.value)}
                />
                <div>
                  <button
                    className="ml-button"
                    onClick={(e) => addToBrightlist(e, brightlistAddress)}
                  >
                    Brightlist
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h5>Revoke an ethereum address</h5>
              <form>
                <input
                  type="text"
                  value={revokeAddress || ""}
                  required
                  onChange={(e) => setRevokeAddress(e.target.value)}
                />
                <div>
                  <button
                    className="ml-button"
                    onClick={(e) => revokeFromBrightlist(e, revokeAddress)}
                  >
                    Revoke
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h3>Create a Molecule NFT</h3>
              <form>
                <div>Cure</div>
                <input
                  type="text"
                  value={cure || ""}
                  required
                  onChange={(e) => setCure(e.target.value)}
                />
                <div>Researcher</div>
                <input
                  type="text"
                  value={researcher || ""}
                  required
                  onChange={(e) => setResearcher(e.target.value)}
                />
                <div>University</div>
                <input
                  type="text"
                  value={university || ""}
                  required
                  onChange={(e) => setUniversity(e.target.value)}
                />
                <div>Patent ID</div>
                <input
                  type="text"
                  value={patentId || ""}
                  required
                  onChange={(e) => setPatentId(e.target.value)}
                />
                <div>Institution</div>
                <input
                  type="text"
                  value={institution || ""}
                  required
                  onChange={(e) => setInstitution(e.target.value)}
                />

                <div>
                  <button
                    className="ml-button"
                    onClick={(e) =>
                      mint(
                        e,
                        cure,
                        researcher,
                        university,
                        patentId,
                        institution
                      )
                    }
                  >
                    Mint token
                  </button>
                </div>
              </form>
              <div>
                <button className="ml-button" onClick={showKey()}>
                  Show Encryption key
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="install-metamask">
            To use the app one must have metamask installed.<br></br>
            <a href="https://metamask.io/" target="_blank">
              Install Metamask
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
