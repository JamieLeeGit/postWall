const http = require("http");
const Post = require('./models/post');

const HttpControllers = require('./controllers/http');
const PostsControllers = require('./controllers/posts');

//DB連線（使用預設檔案 index）
require('./connections');

const routes = require('./routes');

const requestListener = (req,res)=>{
    routes(req, res);
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3007);