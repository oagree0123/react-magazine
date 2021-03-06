import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Grid, Image, Text, Button} from '../elements';
import { history } from '../redux/configStroe';
import LikeButton from './LikeButton';
import UnlikeButton from './UnlikeButton';
import { actionCreators as postActions } from '../redux/modules/post';

const Post = (props) => {
  const dispatch = useDispatch();
  const like_data = useSelector((state) => state.like.list);
  const is_login = useSelector((state) => state.user.is_login);

  const postDelete = () => {
    dispatch(postActions.deletePostFB(props.id));
  }

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
            <Button width="auto" margin="4px" padding="4px" _onClick={() => {
              history.push(`/write/${props.id}`);
            }}>
              수정
            </Button>}
            {props.is_me && 
            <Button width="auto" margin="4px" padding="4px" _onClick={postDelete}>
              삭제
            </Button>}
          </Grid>

        </Grid>
        
        <Grid is_cursor _onClick={() => {history.push(`/post/${props.id}`)}}>
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
        </Grid>

        <Grid is_flex padding="16px">
          <Grid>
            <Text _onClick={() => {history.push(`/post/${props.id}`)}} margin="0px" is_cursor bold>
              댓글 {props.comment_cnt}개
            </Text>
          </Grid>
          <Grid is_justify="flex-end">
          {
            like_data?.liked ?
            <LikeButton liked={like_data.liked} post_id={props.id} /> :
            <UnlikeButton post_id={props.id} />
          }
          <Text bold>
            {props.like_cnt}개
          </Text>
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