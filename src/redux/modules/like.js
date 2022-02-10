import { db } from "../../shared/firebase";
import {
  doc, 
  getDoc, 
  updateDoc, 
  increment,
} from "firebase/firestore"
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { actionCreators as postActions } from "./post";

// actions
const LOAD_LIKE = "LOAD_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

// action creators
const getLike = createAction(LOAD_LIKE, (like_data) => ({like_data}));
const addLike = createAction(ADD_LIKE, (like_data, like_cnt) => ({like_data, like_cnt}));
const deleteLike = createAction(DELETE_LIKE, (like_data, like_cnt) => ({like_data, like_cnt}));

// initialState
const initialState = {
  list: [],
}

// middleware actions
const getLikeFB = () => {
  return async function (dispatch, getState, {history}) {
    if(!getState().user.user?.uid) {
      dispatch(getLike({}))
      return ;
    }
    const user_id = getState().user.user.uid;
    const docRef = doc(db, "like", user_id);

    getDoc(docRef).then((doc) => {
      let like_data = doc.data();

      dispatch(getLike(like_data))
    });
  }
}

const addLikeFB = (post_id) => {
  return function (dispatch, getState, {history}) {
    const user_id = getState().user.user.uid;
    const like_data = getState().like.list.liked;

    /* start like_cnt */
    const post = getState().post.list.find(l => l.id === post_id);
    
    const postDB = doc(db, "post", post_id);

    const like_cnt = increment(1);
    updateDoc(postDB, {like_cnt: like_cnt})
    
    console.log(parseInt(post.like_cnt));
    
    /* end like_cnt */
    
    const docRef = doc(db, "like", user_id);
    updateDoc(docRef, {liked: [...like_data, post_id]});

    /* .then((doc) => {
      console.log(doc);
      dispatch(addLike(doc));
    }); */
    dispatch(addLike({liked: [...like_data, post_id]}, {
      like_cnt: parseInt(post.like_cnt) + 1 
    }));

    dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt) + 1 }))
  }
}

const deleteLikeFB = (post_id) => {
  return async function (dispatch, getState, {history}) {
    const user_id = getState().user.user.uid;
    const _like_data = getState().like.list.liked;

    /* start like_cnt */
    const post = getState().post.list.find(l => l.id === post_id);
    
    if(parseInt(post.like_cnt) <= 0) {
      window.alert("좋아요가 0개 입니다.")
      return;
    }
    const postDB = doc(db, "post", post_id);

    const like_cnt = increment(-1);
    await updateDoc(postDB, {like_cnt: like_cnt})

    console.log(parseInt(post.like_cnt));
    
    /* end like_cnt */

    const like_data = _like_data.filter(v => {
      return v !== post_id;
    });

    const docRef = doc(db, "like", user_id);
    updateDoc(docRef, {liked: [...like_data]});

    dispatch(deleteLike({liked: [...like_data]}, {
      like_cnt: parseInt(post.like_cnt) - 1 
    }));

    dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt) - 1 }))
  }
}

// reducer
export default handleActions({
  [LOAD_LIKE]: (state, action) => produce(state, (draft) => {
    draft.list = action.payload.like_data
  }),
  [ADD_LIKE]: (state, action) => produce(state, (draft) => {
    draft.list = action.payload.like_data
  }),
  [DELETE_LIKE]: (state, action) => produce(state, (draft) => {
    draft.list = action.payload.like_data
  }),
}, initialState)

// action creator export
const actionCreators = {
  getLike,
  getLikeFB,
  addLike,
  addLikeFB,
  deleteLikeFB,
}

export { actionCreators };