import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;


  if(is_float) {
    return (
      <>
        <FloatButton onClick={_onClick} >{text? text : children}</FloatButton>
      </>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  }

  return (
    <>
      <ElButton {...styles} onClick={_onClick}>{text? text : children}</ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  childred: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  padding: '12px 0px',
  width: '100%'
}

const ElButton = styled.button`
  width: ${(props) => props.width};
  color: #fff;
  background-color: #212121;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin? `margin: ${props.margin};` : '')};
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