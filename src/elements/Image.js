import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const {shape, src, size} = props

  const styles = {
    src: src,
    size: size,
  }

  if(shape === "circle") {
    return (
      <ImageCircle {...styles}></ImageCircle>
    );
  }
  if(shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <>
      
    </>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://media.istockphoto.com/photos/dog-puppy-on-garden-picture-id1142412984?k=20&m=1142412984&s=170667a&w=0&h=VLomTUSZwXDrVauJrpiyMboe0Q7lUYYiMO89sFy2dgY=",
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  margin: 4px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;