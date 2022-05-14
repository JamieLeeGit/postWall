
const HttpControllers = require('../controllers/http');
const PostsControllers = require('../controllers/posts');


const routes = async (req, res) => {
    const { url, method } = req;
    console.log(method, url);

    let body = "";
    req.on('data', chunk => {
        body += chunk;
    });

    if((url == "/posts" || url == "/posts/") && method == "GET"){   
        // 查詢全部貼文 
        PostsControllers.readPostsAll(req, res);
    } else if(url.startsWith("/posts/") && method == "GET"){
        // 查詢單筆貼文
        PostsControllers.readPostsOne(req, res);
    } else if((url == "/posts" || url == "/posts/") && method == "POST"){
        // 新增單筆貼文 
        req.on('end', async () => PostsControllers.
        createPostsOne({ req, res, body }));  
    } else if(url.startsWith("/posts/") && method == "PATCH"){
        // 修改單筆貼文 
        req.on('end', async () => PostsControllers.
        updatePostsOne({ req, res, body }));
    } else if((url == "/posts" || url == "/posts/") && method == "DELETE"){
        // 刪除全部貼文 
        PostsControllers.deletePostsAll(req, res);
    } else if(url.startsWith("/posts/") && method == "DELETE"){
        // 刪除單筆貼文 
        PostsControllers.deletePostsOne(req, res);
    }else{
        HttpControllers.notFound(req, res);
    }
}

module.exports = routes;