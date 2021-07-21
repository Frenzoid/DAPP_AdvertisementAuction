import React, { Component } from 'react';

import AdAuction from '../abis/AdAuction.json'
import Web3 from 'web3';

import Navbar from './Navbar'
import Main from './Main'

// Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  constructor(props) {
    super(props)

    this.state = {
      account: '',
      adauctionContract: null,
      currentBidStatus: null,
      loading: true,
    }

    this.submitBid = this.submitBid.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3)
      window.web3 = new Web3(window.web3.currentProvider)
    else
      window.alert('No Eth driver detected in your browser. You should consider trying MetaMask!')
  }

  async loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = AdAuction.networks[networkId]

    if (networkData) {
      const adauctionContract = new web3.eth.Contract(AdAuction.abi, networkData.address)
      const currentBidStatus = await adauctionContract.methods.cbd().call()

      console.log(currentBidStatus)

      this.setState({ adauctionContract })
      this.setState({ currentBidStatus })
      this.setState({ loading: false })

    } else
      window.alert('adauction contract not deployed to detected network.')
  }

  captureFile = (event) => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  submitBid = (message, bidValue) => {
    console.log("Submitting file to ipfs...")
    this.setState({ loading: true })

    // adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {

      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        this.setState({ loading: false })
        return
      }

      // Once the image is uploaded, update the contract.
      this.state.adauctionContract.methods.bid(result[0].hash, message)
        .send({ from: this.state.account, value: bidValue })
        .on('transactionHash', (hash) => {
          this.setState({ loading: false })
          window.location.reload()
        })
        .on('error', (err) => {
          console.error(err)
          window.alert("Error ocurred during transaction, check console.")
          this.setState({ loading: false })
        })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
          ?
          <div id="loader" className="text-center mt-5">
            <img src="https://media.tenor.com/images/a742721ea2075bc3956a2ff62c9bfeef/tenor.gif" alt="loading gif" />
            <p>Loading...</p></div>
          :
          <Main
            currentBidStatus={this.state.currentBidStatus}
            captureFile={this.captureFile}
            submitBid={this.submitBid}
          />
        }
      </div>
    );
  }
}

export default App;