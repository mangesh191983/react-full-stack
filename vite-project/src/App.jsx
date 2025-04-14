
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import Layout from './Layout';

const routes = [{ 
  path: '/',
  element: <Layout/>,
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
    element: <ArticlePage/>
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
