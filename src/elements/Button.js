import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {text, _onClick, is_float, children} = props;


  if(is_float) {
    return (
      <>
        <FloatButton onClick={_onClick} >{text? text : children}</FloatButton>
      </>
    );
  }

  return (
    <>
      <ElButton onClick={_onClick}>{text? text : children}</ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  childred: null,
  _onClick: () => {},
  is_float: false,
}

const ElButton = styled.button`
  width: 100%;
  color: #fff;
  background-color: #212121;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
`;

const FloatButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 16px;
  width: 50px;
  height: 50px;
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  background-color: #212121;
  border: none;
  border-radius: 50px;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
`;

export default Button;