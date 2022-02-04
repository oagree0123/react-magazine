import { Routes, Route } from 'react-router-dom';
import './App.css';

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Header from '../components/Header';
import { Grid } from '../elements';


function App() {
  return (
    <>
      <Grid>
        <Header />
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>  
      </Grid>
    </>
  );
}

export default App;
