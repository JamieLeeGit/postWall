const http = require("http");
const Post = require('./models/post');

const HttpControllers = require('./controllers/http');
const PostsControllers = require('./controllers/posts');

//DB連線（使用預設檔案 index）
require('./connections');

/*
    
      const testPot = new Post(
          {
            name: "jamie",
            tags:["aa"],
            type:"person",
            content:"test",
            }
        );

        testPot.save()
            .then(()=>{
                console.log("新增資料成功");
            })
            .then(error=>{
                console.log(error);
            });
*/
const routes = require('./routes');

const requestListener = (req,res)=>{
    routes(req, res);
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3007);