import { BrowserRouter, Route } from 'react-router-dom';
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
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </BrowserRouter> 
      </Grid>
    </>
  );
}

export default App;
