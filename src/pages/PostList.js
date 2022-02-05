import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  useEffect(() => {
    if(post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  },[])

  return (
    <>
      {/* <Post /> */}
      {post_list.map((p, idx) => {
        if(p.user_info.user_id === user_info?.uid) {
          return <Post key={idx} {...p} is_me />
        } else {
          return <Post key={idx} {...p} />
        }
      })}
    </>
  );
};

export default PostList;