import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const {bold, color, size, children, margin, _onClick, center, is_cursor} = props;

  const styles = {
    margin: margin,
    bold: bold,
    color: color,
    size: size,
    center: center,
    is_cursor: is_cursor,
  }

  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '14px',
  margin: false,
  _onClick: () => {},
  center: false,
  is_cursor: false,
}

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}
  ${(props) => (props.center? `text-align: center;` : '')}
  ${(props) => (props.is_cursor? `cursor: pointer;` : '')}
`;

export default Text;