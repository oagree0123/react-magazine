import { Routes, Route } from 'react-router-dom';
import './App.css';

import PostList from '../pages/PostList';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PostList />} />
      </Routes>
    </>
  );
}

export default App;
