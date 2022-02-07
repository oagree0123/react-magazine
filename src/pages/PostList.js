import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import { Grid } from '../elements';

const PostList = (props) => {
  const dispatch = useDispatch();
  
  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((state) => state.post.list);
  const is_loading =  useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  useEffect(() => {
    if(post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  },[])

  return (
    <>
      <Grid bg={"#EFF6FF"} padding="20px 0px 0px 0px">
      {/* <Post /> */}
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          if(p.user_info.user_id === user_info?.uid) {
            return (
              <Grid 
                margin={"0px 0px 20px 0px"}
                bg={"#fff"}
                key={idx} 
                _onClick={() => {
                history.push(`/post/${p.id}`)
              }}>
                <Post {...p} is_me />
              </Grid>
            );
          } else {
            return (
              <Grid 
                margin={"0px 0px 20px 0px"}
                bg={"#fff"}
                key={idx} 
                _onClick={() => {
                history.push(`/post/${p.id}`)
              }}>
                <Post {...p} />
              </Grid>
            );
          }
        })}
        {/* <button onClick={() =>{
          dispatch(postActions.getPostFB(paging.next));
        }}>추가로드</button> */}
      </InfinityScroll>
      </Grid>
    </>
  );
};

export default PostList;