import React, { Component } from 'react';

class Main extends Component {
    currentMoneyCollected = this.props.currentBidStatus.currentMoneyCollected ? window.web3.utils.fromWei(this.props.currentBidStatus.currentMoneyCollected, 'ether') : 0;
    currentMessage = this.props.currentBidStatus.currentMessage ? this.props.currentBidStatus.currentMessage : "No one bidded yet, be the first one to put the mark in this page!";
    currentImage = this.props.currentBidStatus.currentHashImage ? `https://ipfs.infura.io/ipfs/${this.props.currentBidStatus.currentHashImage}` : "https://dl.airtable.com/.attachmentThumbnails/46d32d5ff3ef75de9d6c185c84a31782/c1744cda";

    currentHighestBidder = this.props.currentBidStatus.currentHighestBidder ? this.props.currentBidStatus.currentHighestBidder : "None";
    currentHighestBid = this.props.currentBidStatus.currentHighestBid ? window.web3.utils.fromWei(this.props.currentBidStatus.currentHighestBid, 'ether') : 0;

    parseSubmitBid = (event) => {
        event.preventDefault()

        // grab values from inputs.
        const message = this.message.value
        const bidValueEth = window.web3.utils.toWei(this.bid.value, 'Ether')

        this.props.submitBid(message, bidValueEth)
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <main role="main" className="ml-auto mr-auto">
                        <div className="mr-auto ml-auto">
                            <p>&nbsp;</p>
                            <h1 className="text-center">Advertisement Auction</h1>
                            <h5 className="text-center">
                                A page where the highest bidder gets to choose what image & message will the webpage display!
                            </h5>

                            <hr></hr>

                            <h3 className="text-center">Current total money collected: {this.currentMoneyCollected} ETH! </h3>

                            <div className="d-flex flex-column text-danger">
                                <h4>The bidder on the throne is: <span className="text-primary">{this.currentHighestBidder.substring(0, 6)}...{this.currentHighestBidder.substring(38, 42)}</span></h4>
                                <h5>with a highest bid of: <span className="text-primary">{this.currentHighestBid}</span> ETH!</h5>
                            </div>
                            <h4 className="text-primary mt-2 mb-3 text-center">{this.currentMessage}</h4>
                            <div className="text-center">
                                <img src={this.currentImage}
                                    style={{ maxWidth: '420px' }}
                                    alt="bidder"
                                />
                            </div>

                            <hr></hr>

                            <form onSubmit={this.parseSubmitBid} >
                                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                                <div className="form-group mr-sm-2">
                                    <textarea
                                        id="message"
                                        type="text"
                                        ref={(input) => { this.message = input }}
                                        className="form-control mb-1 mt-1"
                                        placeholder="Add your custom message to be displayed!"
                                        required />

                                    <input
                                        id="bid"
                                        type="number"
                                        ref={(input) => { this.bid = input }}
                                        className="form-control ml-auto"
                                        placeholder="$$$ Bid Amount in ETH $$$"
                                        required />
                                </div>
                                <button type="submit" class="btn btn-primary btn-block btn-lg">Bid!</button>
                            </form>

                            <p>&nbsp;</p>
                        </div>

                    </main>
                </div>
            </div >)
    }
}

export default Main;
