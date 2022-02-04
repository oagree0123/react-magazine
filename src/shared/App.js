import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStroe';
import { useDispatch } from 'react-redux';

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';

import Header from '../components/Header';
import { Button, Grid } from '../elements';

import { actionCreators as userActions} from "../redux/modules/user";
import { apiKey } from "./firebase";
import Permit from './Permit';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  useEffect(() => {
    if(is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          {/* <Permit>
            <Route path="/wirte" exact component={PostWrite}/>
          </Permit> */}
        </ConnectedRouter> 
      </Grid>
      <Permit>
        <Button is_float text="+"></Button>
      </Permit>
    </>
  );
}

export default App;
