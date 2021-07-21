const AdAuction = artifacts.require("AdAuction");

module.exports = async (deployer) => {
	await deployer.deploy(AdAuction)
};