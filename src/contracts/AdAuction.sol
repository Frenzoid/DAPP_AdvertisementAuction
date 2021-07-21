// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

contract AdAuction {

  struct CurrentBidData {
    // hash of the IPFS file uplaoded.
    string currentHashImage;

    // Current message.
    string currentMessage;

    // address of current highest bidder
    address currentHighestBidder;

    // current highest bid
    uint256 currentHighestBid;

    // Total money collected
    uint256 currentMoneyCollected;
  }

  // We define our struct.
  CurrentBidData public cbd;


  // Oracle to emit when someone overthrows the current highest bidder.
  event currentBidStatus(string hashImage, string message, address currentHighestBid, uint256 currentHighetsBid, uint256 currentMoneyCollected);

	constructor() public {
    cbd.currentMoneyCollected = 0;
  }


  function bid(string memory hashImage, string memory message) public payable {

    // Make sure the image hash exists
    require(bytes(hashImage).length > 0, "hashImage is empty!");

    // Make sure the message exists
    require(bytes(message).length > 0, "message is empty!");

    // Checks that the bid is higher than current highest bid.
    require(msg.value > cbd.currentHighestBid, "Bid is too low!");

    // Make sure uploader address exists
    require(msg.sender != address(0), "Adress is invalid!");

    // track the total amount of eth that the contract is holding
    cbd.currentMoneyCollected += msg.value;

    // Set sender, image hash, current highest bid and message as current.
    cbd.currentHighestBidder = msg.sender;
    cbd.currentHashImage = hashImage;
    cbd.currentMessage = message;
    cbd.currentHighestBid = msg.value;

    // Emit oracle when someone overthrows the current highest bidder.
    emit currentBidStatus(hashImage, message, msg.sender, msg.value, cbd.currentMoneyCollected);
  }

  // Fallback: reverts if Ether is sent to this smart contract by mistake
  fallback() external payable {
    revert("End of the line, the function you're trying to call doesn't exists or its unavailable. Reverting...");
  }
}