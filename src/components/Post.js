import React from 'react';
/* import Grid from '../elements/Grid';
import Image from '../elements/Image';
import Text from '../elements/Text'; */

import {Grid, Image, Text} from '../elements';

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "ohyes",
    user_profile: "https://post-phinf.pstatic.net/MjAyMTA1MDJfMTAy/MDAxNjE5OTI1MTk0MjY5.DbBM3YQvmKzPaenGwlVVfUWmSdsOsCws1wIMtazZ03Yg.dDuT0dHkmo87TQDkZs0fx4-n3mrWzhTz_jh7ImSaA3Ug.JPEG/IMG_2536.jpg?type=w1200",
  },
  image_url: "https://post-phinf.pstatic.net/MjAyMTA1MDJfMTAy/MDAxNjE5OTI1MTk0MjY5.DbBM3YQvmKzPaenGwlVVfUWmSdsOsCws1wIMtazZ03Yg.dDuT0dHkmo87TQDkZs0fx4-n3mrWzhTz_jh7ImSaA3Ug.JPEG/IMG_2536.jpg?type=w1200",
  contents: "강아지는 귀여워",
  comment_cnt: 10,
  insert_dt: "2020-02-04 10:00:00",
};

export default Post;