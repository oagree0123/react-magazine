import React from 'react';
import styled from 'styled-components';

import { Grid } from "./index";

const Radio = (props) => {
  const { type, label, name, value, _onChange } = props;

  return (
    <Grid>
      <label>
        <RadioCheck 
          type={type} 
          name={name} 
          value={value}
          onChange={_onChange}
        />
        {label}
      </label>
    </Grid>
  );
};

Radio.defaultProps = {
  type: "radio",
  label: "",
  name: "",
  value: "",
  _onChange: () => {},
}

const RadioCheck = styled.input`

`;

export default Radio;