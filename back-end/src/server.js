import express from 'express';


const app = express();

app.use(express.json());

const articleVote = [
    {name:"learn-react", vote:0, comment:[]},
    {name:"learn-node", vote:0, comment:[]},
    {name:"mongodb", vote:0, comment:[]}
]

app.post('/api/article/:name/upvote',function(req,res){
    const article = articleVote.find(a => a.name ===req.params.name);
    article.vote++;
    res.json(article);
});

app.post('/api/article/:name/comment',function(req,res){
    const { name } = req.params;
    const { postedBy, text } = req.body   

    const article = articleVote.find(a => a.name === name);
    article.comment.push ({postedBy:postedBy,text:text});

    res.json(article);
});

app.post('/api/article/:name/upvote',function(req,res){
    const article = articleVote.find(a => a.name ===req.params.name);
    article.vote++;
    res.json(article);
});

app.listen(8000,function(){
  console.log('Server is listening port 8000');
});