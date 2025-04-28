import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';
import CommentsList from './CommentsList';
import axios from 'axios';
import AddCommentForm from './AddCommentForm';

export default function ArticlePage(){
    const { name } = useParams();
    const { vote:initialVotes, comment:initialComments } = useLoaderData();
    const article = articles.find(a=> a.name===name);
    const [vote, setArticleVotes] = useState(initialVotes);
    const [comment, setArticleComments] = useState(initialComments);

    async function articleUpvoteClicked(){
     const response =  await axios.post('/api/article/'+name+'/upvote');
     const updatedArticleData = response.data;
     setArticleVotes(updatedArticleData.vote);
    }

    async function onAddComment({ nameText, commentText } ){
      const response =  await axios.post('/api/article/'+name+'/comment',{
        'postedBy': nameText,
        'text': commentText,
      });
      const updatedArticleData = response.data;
      setArticleComments(updatedArticleData.comment);
     }

    return (
        <>
          <h1> { article.title } </h1>
          <button onClick={ articleUpvoteClicked }>UpVote</button>
          <p>This article has { vote } votes!</p>
          { article.content.map(p=> <p key={p}>{p}</p>) }
          <AddCommentForm onAddComment={ onAddComment }/>
          <CommentsList comments={comment}/>
        </>       
     );

}