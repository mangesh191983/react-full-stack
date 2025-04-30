import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';

import fs from 'fs';

const credentials = JSON.parse(
 fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const app = express();

app.use(express.json());

let db;

async function  connectToDb(){
    const uri ='mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri, {
        serverApi:{
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db');
}
app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;    
    const article = await db.collection('articles').findOne( { name } );
    res.json(article);
}) 

const articleVote = [
    {name:"learn-react", vote:0, comment:[]},
    {name:"learn-node", vote:0, comment:[]},
    {name:"mongodb", vote:0, comment:[]}
]

app.use(async function(req, res, next){
   const { authtoken } = req.headers;
   if(authtoken){
         const user = await admin.auth().verifyIdToken(authtoken);
         req.user = user;
         next();
   } else{
     res.sendStatus(400);
   }
});

app.post('/api/article/:name/upvote',async function(req,res){
    const { name } = req.params;
    const { uid } = req.user;

    const articles = await db.collection.findOne({name});
    const canUpvote = uid && !upvoteIds.includes(uid);

    const upvoteIds = articles.upvoteIds || [];


    if(canUpvote){
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, { $inc: {vote:1}, $push:{ upvoteIds: uid } }, {returnDocument:'after'});

    res.json(updatedArticle);  
    }else{
         res.sendStatus(403);
    }
   
      
});

app.post('/api/article/:name/comment',async function(req,res){
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy,text };

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name },
         { $push: { comment: newComment } },
         { returnDocument:'after' });   

    res.json(updatedArticle);
});

app.post('/api/article/:name/upvote',function(req,res){
    const article = articleVote.find(a => a.name ===req.params.name);
    article.vote++;
    res.json(article);
});

async function start() {
    await connectToDb();
    app.listen(8000,function(){
        console.log('Server is listening port 8000');
      });    
}

start();

