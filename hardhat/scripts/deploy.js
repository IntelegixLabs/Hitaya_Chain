const fs = require('fs');

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log(`Deploying contracts with the account: ${deployer.address}`);

	const balance = await deployer.getBalance();
	console.log(`Account balance: ${balance.toString()}`);

	const HAT_TOKEN = await ethers.getContractFactory('HAT_TOKEN');
	const hat_token = await HAT_TOKEN.deploy();
	console.log(`HAT_TOKEN address: ${hat_token.address}`);

	const Migrations = await ethers.getContractFactory('Migrations');
	const migrations = await Migrations.deploy();
	console.log(`Migrations address: ${migrations.address}`);

	const data1 = {
		address: hat_token.address,
		abi: JSON.parse(hat_token.interface.format('json'))
	};

	fs.writeFileSync('frontend/src/HAT_TOKEN.json', JSON.stringify(data1));


	const data2 = {
		address: migrations.address,
		abi: JSON.parse(migrations.interface.format('json'))
	};

	fs.writeFileSync('frontend/src/Migrations.json', JSON.stringify(data2));
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.log(error);
		process.exit(1);
	});