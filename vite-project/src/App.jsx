
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import React from 'react';
import axios from 'axios';
import Homepage from './pages/Homepage'
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import Layout from './Layout';
import PageNotFoundPage from './pages/PageNotFoundPage';


const routes = [{ 
  path: '/',
  element: <Layout/>,
  errorElement: <PageNotFoundPage/>,
  children: [{ 
    path: '/',
    element: <Homepage/>
  },
  { 
    path: '/articles_list',
    element: <ArticleListPage/>
  },
  { 
    path: '/articles/:name',
    element: <ArticlePage/>,
    loader: async function( { params } ){
      const response = await axios.get('/api/articles/'+ params.name);
      const { vote, comment } = response.data;
      return { vote, comment };
    }
  },
  { 
    path: '/news',
    element: <NewsPage/>
  }]  
}];



const router = createBrowserRouter(routes);


function App() {
  return (
    <>    
    <RouterProvider router= {router}></RouterProvider>
    </>
  );
}

export default App
