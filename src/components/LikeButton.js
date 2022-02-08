import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { pink } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';

import { actionCreators as likeActions } from '../redux/modules/like';

const LikeButton = (props) => {
  const dispatch = useDispatch();
  const { liked, post_id } = props;

  const clickUnlike = () => {
    dispatch(likeActions.deleteLikeFB(post_id));
  }

  const clickLike = () => {
    dispatch(likeActions.addLikeFB(post_id));
  }

  if(liked.includes(post_id)){
    return (
      <>
        <Like onClick={clickUnlike}>
          <FavoriteIcon style={{ color: pink[500] }}  />
        </Like> 
      </>
    );
  } else {
    return (
      <>
        <Like onClick={clickLike}>
          <FavoriteBorderIcon style={{ color: pink[500] }}  />
        </Like> 
      </>
    );
  }
};

const Like = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;


export default LikeButton;