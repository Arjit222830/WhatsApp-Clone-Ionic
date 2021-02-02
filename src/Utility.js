const moment= require('moment');

const Utility= {
    getToday,
    getRandom,
    getTime
}

function getRandom(length = 7) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function getToday(){
    return moment().format("DD-MM-YYYY");
}

function getTime(unix_timestamp) {

    let date = new Date(unix_timestamp * 1000);
  
    let hours = date.getHours();
  
    let minutes = "0" + date.getMinutes();
  
    let formattedTime = hours + ':' + minutes.substr(-2);
  
    return formattedTime;
    
  }
  

module.exports= Utility;