import React from 'react';
import styled from 'styled-components';
import { pink } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const UnlikeButton = () => {
  return (
    <>
      <Unlike onClick={() => {window.alert("로그인 후 누를 수 있어요!")}}>
        <FavoriteBorderIcon style={{ color: pink[500] }}  />
      </Unlike>
    </>
  );
};

const Unlike = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default UnlikeButton;