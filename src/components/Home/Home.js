import React, { useState, useEffect } from "react"
import "./Home.css"
import cryptoJS from "crypto-js"
import { create } from "ipfs-http-client"
import { moleculeABI } from "../../ABIs/Molecule"

import { ethers } from "ethers"

export default function Home() {
  const [userAddress, setUserAddress] = useState()
  useState(null)

  const [cure, setCure] = useState(null)
  const [researcher, setResearcher] = useState(null)
  const [university, setUniversity] = useState(null)
  const [patentId, setPatentId] = useState(null)
  const [institution, setInstitution] = useState(null)
  const [brightlistAddress, setBrightlistAddress] = useState(null)
  const [revokeAddress, setRevokeAddress] = useState(null)
  const [showKey, setShowKey] = useState(false)

  const contractAddress = "0xe8c894d0b2e70d5ad03e66e7e5b31d24a96ae83a"

  const accounts = window.ethereum.request({ method: "eth_requestAccounts" })
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const walletAddress = accounts[0]

  const signer = provider.getSigner(walletAddress)
  const signerAddress = signer.getAddress()

  useEffect(async () => {
    const chainId = parseInt(window.ethereum.chainId)
    localStorage.setItem("chainId", chainId)
    setUserAddress(localStorage.getItem("userAddress"))
  }, [])

  const moleculeContract = new ethers.Contract(
    contractAddress,
    moleculeABI,
    signer
  )

  async function getTokenURI(tokenId) {
    const tokenURI = await moleculeContract.tokenURI(0)
    return tokenURI
  }

  async function addToBrightlist(e, address) {
    e.preventDefault()
    const whitelisted = await moleculeContract.addToBrightlist(address)
  }

  async function revokeFromBrightlist(e, address) {
    e.preventDefault()
    const removed = await moleculeContract.revokeFromBrightlist(address)
  }

  function encrypt(contractData) {
    //get a random encrytion key
    let r = (Math.random() + 1).toString(36).substring(7)
    console.log("random", r)

    localStorage.setItem("encryptionKey", r)

    const ciphertext = cryptoJS.AES.encrypt(contractData, r)
    console.log("cipertext", ciphertext.toString())
    return ciphertext.toString()
  }

  // TO DO
  async function decrypt() {
    //one of the suggested things would be, build a backend and store them there not in local storage.
    // map every user address to the tokenID and the key
    // const bytes = cryptoJS.AES.decrypt(ciphertext.toString(), r)
    // const plaintext = bytes.toString(cryptoJS.enc.Utf8)
    // console.log("plaintext", plaintext)
    // const JSONEND = JSON.parse(plaintext)
    // console.log("initial", JSONEND)
  }

  //TO DO REFACTOR THE CODE FROM MINT FUNCTION
  async function uploadToIpfs() {}

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

    const ipfsAddHashedObject = await ipfs.add(encryptedContractData)

    console.log("ipfsAdded", ipfsAddHashedObject.path)

    let tokenNumber = await moleculeContract.counter()
    tokenNumber++

    const tokenUri = {
      name: `token #${tokenNumber}`,
      description: `this token can cure ${cure}`,
      contractData: `ipfs://Qm${ipfsAddHashedObject.path}`,
    }

    const ipfsAddTokenURI = await ipfs.add(JSON.stringify(tokenUri))

    await moleculeContract.addToBrightlist(signerAddress)

    const receipt = await moleculeContract.mintToken(ipfsAddTokenURI.path)
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
                <button
                  className="ml-button"
                  onClick={() => {
                    setShowKey(!showKey)
                  }}
                >
                  {showKey ? "Hide Encryption Key" : "Show Encryption Key"}
                </button>
                <span className="encryptionKey">
                  {showKey ? localStorage.getItem("encryptionKey") : ""}
                </span>
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
