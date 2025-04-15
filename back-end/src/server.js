import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';


const app = express();

app.use(express.json());
app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;
    const uri ='mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri, {
        serverApi:{
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    const db = client.db('full-stack-react-db');
    const article = await db.collection('articles').findOne( { name } );

    res.json(article);
}) 

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