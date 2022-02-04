import React from 'react';

import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';

const PostDetail = (props) => {
  return (
    <>
      <Post />
      <CommentWrite />
      <CommentList />
    </>
  );
};

export default PostDetail;