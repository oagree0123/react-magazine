import React from 'react';

import {Grid, Image, Text, Button} from '../elements';
import { history } from '../redux/configStroe';

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid is_flex padding="16px">

          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>

          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && 
            <Button Zindex="100" width="auto" margin="4px" padding="4px" _onClick={() => {
              history.push(`/write/${props.id}`);
            }}>
              수정
            </Button>}
          </Grid>

        </Grid>
        <Grid _onClick={() => {history.push(`/post/${props.id}`)}}>
        {
          (props.post_type === "left") ?
            (
            <Grid 
              is_left
              padding="0px 16px"
            >
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
              <Grid>
                <Text center>{props.contents}</Text>
              </Grid>
            </Grid>
            ) : 
            (props.post_type === "right") ?
            (
            <Grid is_right padding="0px 16px">
              <Grid padding="16px">
                <Text center>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid>
            ) :
            (
            <Grid padding="0px 16px">
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid>
            )
        }
          
        
        {/* <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid> */}

        <Grid padding="16px">
          <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
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
  is_me: false,
  post_type: "normal",
};

export default Post;