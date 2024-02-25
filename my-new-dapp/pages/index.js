import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
const ethers = require('ethers');

//connect to metamask
//execute to a function

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isConnected, setIsConnect] = useState(false);
  const [signer, setSigner] = useState();
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnect(true);
        let connectedProvider = new ethers.provider.Web3Provider(
          window.ethereum
        );
        setSigner(connectedProvider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnect(false);
    }
  }
  
  async function execute() {
    if (!signer) {
      console.log('not connected to metamask');
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [{ "type": "function", "name": "addPerson", "inputs": [{ "name": "_name", "type": "string", "internalType": "string" }, { "name": "_favoriteNumber", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "listOfPeople", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "favoriteNumber", "type": "uint256", "internalType": "uint256" }, { "name": "name", "type": "string", "internalType": "string" }], "stateMutability": "view" }, { "type": "function", "name": "nameToFavoriteNumber", "inputs": [{ "name": "", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "retrieve", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "store", "inputs": [{ "name": "_favoriteNumber", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }];


    //   let connectedProvider = new ethers.provider.Web3Provider(
    //     window.ethereum
    //   );
    // const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract);
    try {
      const tx = await contract.store(42);
      console.log('transaction sent:', tx);
      const receipt = await tx.wait();
      console.log('transaction received:', receipt);
    } catch (error) {
      console.log('error executing transaction', error);
    }
  } else {
    executeButton.innerHTML = "Please install MetaMask";
  }
}
    
  


  return (
    <div className={styles.container}> 
      hello hamid
      {isConnected ? (
        <>
          "connected"
          <button onClick={() => execute()}>Execute</button> 
          
        </>
      ) : (
        
        <button onClick={() => connect()}>Connect</button>
        
        
      )}
      
    </div>
  )
}
