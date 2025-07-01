// ✅ CORRECT App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/blog';
import Post from './pages/Post';


function App() {
  return (

    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/post/:slug" element={<Post />} />
    </Routes>
    
  );

  
}

export default App;
