const HttpControllers = require('./http');
const Post = require('../models/post');

/**
 * 取得所有貼文 & 偷懶檢查 DB 所有資料用
 * @param {resquest} req 連線請求
 * @param {respones} res 回應結果
 */
const success = async function(req, res){
    const data = await Post.find();
    HttpControllers.successHandle({req, res, data});
}

const posts = {
    /**
     * 讀取單一貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readPostsOne(req, res){
        console.log('readPostsOne');

        // 取得貼文 id    
        const id = req.url.split('/').pop();

        if(id){
            const data = await Post.findOne({ _id: id});
            HttpControllers.successHandle({req, res, data});
        }else{
            HttpControllers.errorHandle(req, res);
        }
    },
    /**
     * 讀取所有貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readPostsAll(req, res){   
        console.log('readPostsAll');

        await success(req, res);
    },
    /**
     * 新增單筆貼文
     * @param {*} param0 
     */
    async createPostsOne({ req, res, body }){
        console.log('createPostsOne');

        try{
            const data = JSON.parse(body);

            // 檢查所有必填欄位
            if(data.name && data.tags && data.type && data.content){
                const result = await Post.create
                (
                    {
                        name: data.name,
                        tags: data.tags,
                        type: data.type,
                        content: data.content,
                        image: data.image
                    }
                );

                await success(req, res);                 
            }else{                
                HttpControllers.errorHandle(req, res);
            }                
        }catch(err){
            console.log(err);
            HttpControllers.errorHandle(req, res);
        }
    },
    /**
     * 給 user 修改單一貼文內容用
     * @param {*} param0 
     */
    async updatePostsOne({ req, res, body }){
        console.log('updatePostsOne');

        try{     
            const id = req.url.split('/').pop();           
            const data = JSON.parse(body);
            
            if(id && (data.content || data.tags)){
                const result = await Post.findByIdAndUpdate(
                    id, 
                    {
                        content: data.content,
                        tags: data.tags
                    }
                );
                
                await success(req, res);  
            }else{
                HttpControllers.errorHandle(req, res);
            }                   
        }catch(err){
            HttpControllers.errorHandle(req, res);
        }
    },
    /**
     * 刪除單筆貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async deletePostsOne(req, res){
        console.log('deletePostsOne');

        try{
            const id = req.url.split('/').pop(); 

            if(id){
                const result = await Post.findByIdAndDelete(id);
                await success(req, res); 
            }else{
                HttpControllers.errorHandle(req, res);
            }  
        }catch(err){
            HttpControllers.errorHandle(req, res);
        }      
    },
    /**
     * 刪除全部貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async deletePostsAll(req, res){
        console.log('deletePostsAll');

        const result = await Post.deleteMany({});
        await success(req, res); 
    },
}

module.exports = posts;