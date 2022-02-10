import { db } from "../../shared/firebase";
import {
  collection, 
  getDocs,
  getDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
  doc,
  limit,
  startAt,
  deleteDoc,
} from "firebase/firestore"
import { 
  ref, 
  uploadString, 
  getDownloadURL,
} from "firebase/storage";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { storage } from "../../shared/firebase";

import { actionCreators as imageActions } from "./image";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// action creators
const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (post_index) => ({post_index}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  list: [],
  paging: {start: null, next: null, size: 3},
  is_loading: false,
};

const initialPost = {
  /* id: 0,
  user_info: {
    user_name: "ohyes",
    user_profile: "https://post-phinf.pstatic.net/MjAyMTA1MDJfMTAy/MDAxNjE5OTI1MTk0MjY5.DbBM3YQvmKzPaenGwlVVfUWmSdsOsCws1wIMtazZ03Yg.dDuT0dHkmo87TQDkZs0fx4-n3mrWzhTz_jh7ImSaA3Ug.JPEG/IMG_2536.jpg?type=w1200",
  }, */
  image_url: "https://post-phinf.pstatic.net/MjAyMTA1MDJfMTAy/MDAxNjE5OTI1MTk0MjY5.DbBM3YQvmKzPaenGwlVVfUWmSdsOsCws1wIMtazZ03Yg.dDuT0dHkmo87TQDkZs0fx4-n3mrWzhTz_jh7ImSaA3Ug.JPEG/IMG_2536.jpg?type=w1200",
  contents: "",
  comment_cnt: 0,
  like_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
  post_type: "normal",
};

// middleware actions
const deletePostFB = (post_id) => {
  return async function(dispatch, getState, {history}) {
    if(!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _post = getState().post.list;
    
    const docRef = doc(db, "post", post_id);
    await deleteDoc(docRef);

    const post_index = _post.findIndex((v) => {
      return v.id === post_id;
    });

    dispatch(deletePost(post_index));
    history.replace('/');
  }
}

const editPostFB = (post_id=null, post={}) => {
  return async function (dispatch, getState, {history}) {

    if(!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const postDB = doc(db, "post", post_id);

    if(_image === _post.image_url) {
      await updateDoc(postDB, post);
      dispatch(editPost(post_id, {...post}));
      history.replace('/');

      return;
    } else {
      const user_id = getState().user.user.uid;
      const storageRef = ref(storage, `images/${user_id}_${new Date().getTime()}`);
      const _upload = uploadString(storageRef, _image, 'data_url');
      
      _upload.then((snapshot) => {
        console.log(snapshot);

        getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log(url);

          return url;
        }).then((url) => {
          updateDoc(postDB, {...post, image_url: url});
          dispatch(editPost(post_id, {...post, image_url: url}));
          history.replace('/');
        });
      })
      .catch((err) => {
        window.alert("이미지 업로드에 문제가 있어요!");
        console.log("이미지 업로드 실패!", err);
      });
    }
  }
};

const addPostFB = (contents="", type_check="normal") => {
  return async function (dispatch, getState, {history}) {
    const _user = getState().user.user;
    
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
      post_type: type_check,
    };

    const _image = getState().image.preview;

    const storageRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);
    const _upload = uploadString(storageRef, _image, 'data_url');
    
    _upload.then((snapshot) => {
      console.log(snapshot);

      getDownloadURL(snapshot.ref)
      .then((url) => {
        console.log(url);

        return url;
      }).then(async (url) => {
        const docRef = await addDoc(collection(db, "post"), {...user_info, ..._post, image_url: url});
        const post_data = { id: docRef.id, user_info, ..._post, image_url: url }

        dispatch(addPost(post_data));
        history.replace('/');

        dispatch(imageActions.setPreview(null));
      })
      .catch((err) => {
        window.alert("포스트 작석에 문제가 있어요!");
        console.log("포스트 작성실패", err);
      });
    })
    .catch((err) => {
      window.alert("이미지 업로드에 문제가 있어요!");
      console.log("이미지 업로드 실패!", err);
    });
  }
};

const getPostFB = (start=null, size=4) => {
  return async function (dispatch, getState, {history}) {

    let _paging = getState().post.paging;
    if(_paging.start && !_paging.next){
      return;
    }

    dispatch(loading(true));

    let postDB = query(collection(db, "post"), orderBy("insert_dt", "desc"));
    
    if(start) {
      postDB = query(postDB, startAt(start));
    }

    postDB = query(postDB, limit(size+1));

    const post_data = await getDocs(postDB);
    let post_list = [];

    let paging = {
      start: post_data.docs[0],
      next: post_data.docs.length === size+1? 
        post_data.docs[post_data.docs.length - 1] : 
        null,
      size : size,
    }

    post_data.forEach((doc) => {
      let _post = doc.data();

      // ['comment_cnt, 'contents, ..]
      let post = Object.keys(_post).reduce((acc, cur) => {
        
        if(cur.indexOf("user_") !== -1) {
          return {
            ...acc, 
            user_info: {...acc.user_info, [cur]: _post[cur]},
          };
        }

        return {...acc, [cur]: _post[cur]}
      }, {id: doc.id, user_info: {}});

      post_list.push(post);
    });

    if(paging.next !== null){
      post_list.pop();
    }

    dispatch(setPost(post_list, paging));
  }
};

const getOnePostFB = (id) => {
  return function(dispatch, getState, {history}) {
    const postDB = doc(db, "post", id);
    getDoc(postDB).then(doc => {

      let _post = doc.data();
      let post_d = Object.keys(_post).reduce((acc, cur) => {
        
        if(cur.indexOf("user_") !== -1) {
          return {
            ...acc, 
            user_info: {...acc.user_info, [cur]: _post[cur]},
          };
        }

        return {...acc, [cur]: _post[cur]}
      }, {id: doc.id, user_info: {}});

      dispatch(setPost([post_d]));
    });
  }
}

// reducer
export default handleActions({
  [SET_POST]: (state, action) => produce(state, (draft) => {
    draft.list.push(...action.payload.post_list);

    draft.list = draft.list.reduce((acc, cur) => {
      if(acc.findIndex(a => a.id === cur.id) === -1) {
        return [...acc, cur];
      } else {
        acc[acc.findIndex(a => a.id === cur.id)] = cur;
        return acc;
      }
    }, []);

    if(action.payload.paging) {
      draft.paging = action.payload.paging;
    }
    draft.is_loading = false;
  }),
  [ADD_POST]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.post);
  }),
  [EDIT_POST]: (state, action) => produce(state, (draft) => {
    let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    draft.list[idx] = {...draft.list[idx], ...action.payload.post};
    console.log(idx, action.payload.post)
  }),
  [DELETE_POST]: (state, action) => produce(state, (draft) => {
    const new_post_list = draft.list.filter((v, i) => {
      return parseInt(action.payload.post_index) !== i;
    })

    draft.list = new_post_list;
  }),
  [LOADING]: (state, action) => produce(state, (draft) => {
    draft.is_loading = action.payload.is_loading;
  }),
}, initialState);

// action creator export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
  getOnePostFB,
}

export { actionCreators };