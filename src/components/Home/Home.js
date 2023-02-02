import React, { useState, useEffect } from "react"
import "./Home.css"
import cryptoJS from "crypto-js"
import * as IPFS from "ipfs-http-client"

import { ethers } from "ethers"

export default function User() {
  const [userAddress, setUserAddress] = useState()
  useState(null)

  const [cure, setCure] = useState(null)
  const [researcher, setResearcher] = useState(null)
  const [university, setUniversity] = useState(null)
  const [patentId, setPatentId] = useState(null)
  const [institution, setInstitution] = useState(null)

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setUserAddress(accounts[0])
      localStorage.setItem("userAddress", accounts[0])

      location.reload()
    })

    const changeNetwork = async ({ networkName, setError }) => {
      try {
        if (!window.ethereum) throw new Error("No crypto wallet found")
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        })
      } catch (err) {
        setError(err.message)
      }
    }

    const [error, setError] = useState()

    const handleNetworkSwitch = async (networkName) => {
      setError()
      await changeNetwork({ networkName, setError })
    }

    const networkChanged = (chainId) => {
      console.log({ chainId })
    }

    useEffect(() => {
      const chainId = parseInt(window.ethereum.chainId)
      localStorage.setItem("chainId", chainId)
      setUserAddress(localStorage.getItem("userAddress"))

      window.ethereum.on("chainChanged", networkChanged)
      return () => {
        window.ethereum.removeListener("chainChanged", networkChanged)
      }
    }, [])
  }

  async function brightlist() {}

  async function revoke() {}

  async function encrypt() {}

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

    let r = (Math.random() + 1).toString(36).substring(7)
    console.log("random", r)

    const ciphertext = cryptoJS.AES.encrypt(stringMintObject, r)
    console.log("cipertext", ciphertext.toString())

    // put the ciphertext string to IPFS

    // eventually put put sensitive data in an env file
    const projectId = "2LCM7opw4FWtnPy0xOy0CLo3U1y"
    const projectSecret = "c1b3f41538aefb44572728ccbb83e9d9"

    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

    const ipfs = IPFS.create({
      host: "goerli.infura.io/v3/525818ec5792443493d4f7b00910b417",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    })
    console.log("ipfs", ipfs)

    const ipfsAddHashedObject = await ipfs.add(ciphertext.toString())
    console.log("ipfsAdded", ipfsAddHashedObject)

    //read from the contract what is the number of tokens, get the number of tokens + 1 and put it in the token name
    // contract.getNumberOfTokens()

    const tokenNumber = 0 //todo
    const tokenUri = {
      name: `token #${tokenNumber}`,
      description: `this token can cure ${cure}`,
      contractData: `ipfs://Qm${ipfsAddHashedObject.cid}`,
    }

    const ipfsAddTokenURI = await ipfs.add(tokenUri)

    // contract.mint(tokenAddress, tokenUri.cid)
    // when is minted put the encryption key in localStorage alongside the tokenId

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
                <div>
                  <button onClick={showKey()}>Show Encryption key</button>
                </div>
              </form>
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
