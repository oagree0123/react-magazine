import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);

  useEffect(() => {
    if(post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  },[])

  return (
    <>
      {/* <Post /> */}
      {post_list.map((p, idx) => {
        return <Post key={idx} {...p} />
      })}
    </>
  );
};

export default PostList;