import React, { useEffect, useState } from 'react';
import { 
  collection,
  doc,
  getDoc,
  query,
  where,
 } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { useSelector, useDispatch } from 'react-redux';

import Permit from "../shared/Permit";
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import {actionCreators as postActions} from "../redux/modules/post"

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector(store => store.post.list);
  const post_idx = post_list.findIndex(p => p.id === id);

  const post = post_list[post_idx];
  console.log(id);

  useEffect(() => {
    if(post) {
      return ;
    }
    dispatch(postActions.getOnePostFB(id));
    console.log("하나가져오기");
  }, [])

  return (
    <>
      {post && 
        <Post 
          {...post} 
          is_me={post.user_info.user_id === user_info?.uid} 
        />}
      <Permit>
        <CommentWrite post_id={id}/>
      </Permit>
      <CommentList post_id={id}/>
    </>
  );
};

export default PostDetail;