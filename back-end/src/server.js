import express from 'express';


const app = express();

app.use(express.json());

const articleVote = [
    {name:"learn-react", vote:0},
    {name:"learn-node", vote:0},
    {name:"mongodb", vote:0}
]

app.post('/api/article/:name/upvote',function(req,res){
    const article = articleVote.find(a => a.name ===req.params.name);
    article.vote++;
    res.send("Article "+article.name+" total votes are "+article.vote);
});

app.listen(8000,function(){
  console.log('Server is listening port 8000');
});