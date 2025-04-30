import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';
import CommentsList from './CommentsList';
import axios from 'axios';
import AddCommentForm from './AddCommentForm';
import userUser from '../useUser';

export default function ArticlePage(){
    const { name } = useParams();
    const { vote:initialVotes, comment:initialComments } = useLoaderData();
    const article = articles.find(a=> a.name===name);
    const [vote, setArticleVotes] = useState(initialVotes);
    const [comment, setArticleComments] = useState(initialComments);

    const {isLoading, user} = userUser();

    async function articleUpvoteClicked(){
     const token = user && await user.getIdToken();
     const headers = token ? { authtoken: token }: {};

     const response =  await axios.post('/api/article/'+name+'/upvote', null ,{  headers });
     const updatedArticleData = response.data;
     setArticleVotes(updatedArticleData.vote);
    }

    async function onAddComment({ nameText, commentText } ){
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token }: {};
 
      const response =  await axios.post('/api/article/'+name+'/comment',{
        'postedBy': nameText,
        'text': commentText,
      }, {  headers });
      const updatedArticleData = response.data;
      setArticleComments(updatedArticleData.comment);
     }

    return (
        <>
          <h1> { article.title } </h1>
          {user && <button onClick={ articleUpvoteClicked }>UpVote</button>}
          <p>This article has { vote } votes!</p>
          { article.content.map(p=> <p key={p}>{p}</p>) }
          {user ? <AddCommentForm onAddComment={ onAddComment }/>
          : <p>Log in to Add Comment</p>}
          <CommentsList comments={comment}/>
        </>       
     );

}