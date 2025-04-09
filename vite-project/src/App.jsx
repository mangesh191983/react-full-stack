
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import News from './pages/News';
import Articles from './pages/Articles';

const routes = [{ 
  path: '/',
  element: <Homepage/>
},
{ 
  path: '/articles',
  element: <Articles/>
},
{ 
  path: '/news',
  element: <News/>
}

];

const router = createBrowserRouter(routes);


function App() {
  return (
    <RouterProvider router= {router}></RouterProvider>
  );
}

export default App
