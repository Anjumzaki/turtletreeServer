module.exports = {
    index_page:(req,res) => {
        let query="SELECT * FROM news_post WHERE status=1";
        db.query(query,(req,result) => {
            res.render('index.ejs',{
                    news_posts: result
                }                
            );
        });        
    },
    view_post_page:(req,res) =>{
        let iid=req.params.id;
        let query="SELECT * FROM news_post WHERE id='"+iid+"' AND status=1";
        db.query(query, (req_q,result) => {
            check_post=result.length;
            if (check_post > 0) {
                res.render('view_post.ejs', {
                    news_post: result[0]
                });
            } else {
                res.redirect('/');
            }            
        });
    }
}