import React, { useState, useEffect } from "react"
import "./Home.css"
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

  async function mint(e) {
    e.preventDefault()
    //mint
    //encrypt the data
    //get the encryption key from somewhere
    console.log("mint")
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
                  <button className="ml-button" onClick={(e) => mint(e)}>
                    Mint token
                  </button>
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
