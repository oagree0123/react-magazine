import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  setPersistence, 
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc, collection } from 'firebase/firestore';

import { auth, db } from '../../shared/firebase';
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie"
import { actionCreators as likeActions } from './like';

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "ohyes",
}

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {
    // miantain login state
    setPersistence(auth, browserSessionPersistence)
    .then((res) => {
       // signin with email password
      signInWithEmailAndPassword(auth, id, pwd)
      .then((user) => {
        console.log("로그인 성공!");
        console.log(user);
        dispatch(setUser({
          id: id,
          user_name: user.user.displayName,
          user_profile: '',
          uid: user.user.uid,
        }));
        dispatch(likeActions.getLikeFB());
        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("아이디와 비밀번호를 다시 확인해주세요!")
        console.log(errorCode, errorMessage);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
  }
}

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, {history}){
    createUserWithEmailAndPassword(auth, id, pwd)
    .then((user) => {
      console.log(user);
      let user_uid = user.user.uid
      updateProfile(auth.currentUser, {
        displayName: user_name,
      }).then(() => {
        dispatch(setUser({
          id: id,
          user_name: user_name,
          user_profile: '',
          uid: user.user.uid,
        }));

        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
      console.log(user_uid);
      const docRef = doc(db, "like", user_uid);
      setDoc(docRef, {liked: []});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
  }
}

const loginCheckFB = () => {
  return function (dispatch, getState, {history}) {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        dispatch(setUser({
          id: user.email,
          user_name: user.displayName,
          user_profile: '',
          uid: user.uid,
        }));
      } else {
        dispatch(logOut());
      }
    });
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    signOut(auth).then(() => {
      dispatch(logOut());
      history.replace('/');
    }).then(() =>{
      dispatch(likeActions.getLikeFB());
    });
  }
}

// reducer
export default handleActions({
  [SET_USER]: (state, action) => produce(state, (draft) => {
    setCookie("is_login", "success");
    draft.user = action.payload.user;
    draft.is_login = true;
  }),
  [LOG_OUT]: (state, action) => produce(state, (draft) => {
    deleteCookie("is_login");
    draft.user = null;
    draft.is_login = false;
  }),
  [GET_USER]: (state, action) => produce(state, (draft) => {
    
  }),
}, initialState);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
}

export { actionCreators };