const responeHandle = require('../service/responseHandle');

const http = {
    successHandle({req, res, data}){
        responeHandle(res, 200, {
            "status": "success",
            "data": data
        });
    },
    errorHandle(req, res){
        responeHandle(res, 400, {
            "status": "fail",
            "massage": "欄位未填寫正確，或無此貼文"
        });
    },
    notFound(req, res){
        responeHandle(res, 404, {
            "status": "fail",
            "massage": "無此網站路由"
        });
    }
}

module.exports = http;