const headers = require('./headers');

function responseHandle(res, statusCode, responeJsonObj){
    res.writeHead(statusCode, headers);
    res.write(JSON.stringify(responeJsonObj));
    res.end();
}

module.exports = responseHandle;