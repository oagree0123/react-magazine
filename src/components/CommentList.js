import React from 'react';

import { Button, Grid, Text, Image } from '../elements';

const CommentList = (props) => {
  return (
    <>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </>
  );
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