import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, Text, Image } from '../elements';
import { actionCreators as commentActions } from '../redux/modules/comment';

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);

  const {post_id} = props;

  useEffect(() => {
    if(!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  if(!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <>
      <Grid padding="16px">
        {comment_list[post_id].map(c => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </>
  );
};

CommentList.defaultProps = {
  post_id: null,
};

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } = props;

  return (
    <Grid is_flex>
      <Grid margin="0px 4px" is_flex width="auto">
        <Image shape="circle" />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex>
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "ohyes1",
  user_id: "",
  post_id: 1,
  contents: "강아지 귀여워",
  insert_dt: "2022-02-04 20:00:00",
}

export default CommentList;