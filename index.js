const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const ReadLine = require('readline');
const client = new SteamUser();

let rl = ReadLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Input Username, password, steam guard code:
rl.question('Username: ', (accountName) => {
	rl.question('Password: ', (password) => {
		rl.question('SteamGuardCode: ', (guard) => {
			doLogin(accountName, password, guard);
		});
	});
});

// Login to the main account:
function doLogin(accountName, password, authCode, captcha) {
	client.logOn({
		accountName: accountName,
		password: password,
		twoFactorCode: authCode,
		captcha: captcha
	})
}
client.on('loggedOn', () => {
    	
	console.log('----------------------------------------------------------------------');
	console.log( client.steamID + ' - Successfully logged on');

	client.setPersona(1);                 
	client.gamesPlayed([730, 440, 753]);    // 753 = Steam, 730 = CSGO, 440 = Team Fortress 2
});