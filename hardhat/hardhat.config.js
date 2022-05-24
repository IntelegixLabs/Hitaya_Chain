/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const INFURA_URL = 'https://rinkeby.infura.io/v3/19ba006c58d44c488c62b122af2418bb';
const PRIVATE_KEY = 'c91b84395f14a58c316a91f63f700198ccbf94e3bb23d034aa539b728fd664ad';

require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: "0.8.5",
	networks: {
		rinkeby: {
			url: INFURA_URL,
			accounts: [`0x${PRIVATE_KEY}`]
		}
	}
};
