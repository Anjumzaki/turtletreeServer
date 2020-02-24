module.exports={
    admin_index_page:(req,res) => {
        if (req.session.email) {
            let query="SELECT * FROM news_post WHERE status=1";
            db.query(query,(req,result) => {
                res.render('admin_index.ejs',{
                        news_posts: result
                    }                
                );
            });
        } else {
            res.render('admin_login.ejs',{
                message: ""
            });
        }
        
        // res.redirect('/');
    },
    admin_login:(req,res) => {
        res.render('admin_login.ejs',{
            message: ""
        });
    },
    admin_login_page:(req,res) => {
        if (req.session.email) {
            res.render('admin_index.ejs');
        } else {            
            let email=req.body.email;
            let password=req.body.password;
            // console.log(email);
            // console.log(password);
            let query="SELECT * FROM login WHERE email='"+email+"' AND password='"+password+"' AND status='1'";
            db.query(query,(err, result) => {
                if(err){
                    throw err;
                }else{
                    if (result.length > 0) {
                        let i_d=result[0]['id'];
                        sess=req.session;
                        sess.email=email;
                        sess.iid=i_d;
                        let ee=sess.iid;
                        // console.log(sess.email);
                        res.redirect('/admin');
                    } else {
                        res.render('admin_login.ejs',{
                            message: "invalid login"
                        });
                    }
                    
                }
            });
        }
        
    },
    admin_logout:(req,res) => {
        req.session.destroy();
        res.redirect('/admin_login');
    },
    admin_add_news_post:(req,res) => {
        let title=req.body.title;
        let detail=req.body.detail;
        let uploadedFile = req.files.img;
        let img_name = uploadedFile.name;
        var today = new Date();
        var year=today.getFullYear();
        var month=today.getMonth()+1;
        var day=today.getDate();
        var date = year+'-'+month+'-'+day;
        // console.log(date);
    
        uploadedFile.mv('public/upload/news_post/'+img_name, (err) => {
            let query="INSERT INTO news_post(title,detail,img,create_at,status) VALUES('"+title+"','"+detail+"','"+img_name+"','"+date+"','1')";
            db.query(query, (req_q,result) => {
                res.redirect('/admin');
            });
        });
    },
    admin_edit_news_post:(req,res) => {
        iid=req.params.id;
        let query="SELECT * FROM news_post WHERE id='"+iid+"'";
        db.query(query,(req_q,result) => {
            res.render('admin_edit_news_post',{
                news_post: result[0]
            });
        });
    },
    admin_delete_news_post:(req,res) => {
        iid=req.params.id;
        let query="UPDATE news_post SET status=0 WHERE id='"+iid+"'";
        db.query(query,(req_q,result) => {
            res.redirect('/admin');
        });
    },
    admin_update_news_post:(req,res) => {
        let iid=req.params.id;
        let title=req.body.title;
        let detail=req.body.detail;
        let uploadedFile = req.files.img;
        let img_name = uploadedFile.name;
        uploadedFile.mv('public/upload/news_post/'+img_name, (err) => {
            let query="UPDATE news_post SET title='"+title+"', detail='"+detail+"', img='"+img_name+"' WHERE id='"+iid+"'";
            console.log(query)
            db.query(query,(req_q,result) => {
                res.redirect('/admin');
            });
        });
    }
    
}