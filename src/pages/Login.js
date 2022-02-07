import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Grid, Input, Text } from '../elements';

import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from '../shared/common';

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const login = () => {
    if(id === "" || pwd === "") {
      alert("로그인 정보를 입력해주세요!");
      return;
    }

    if(!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  }

  return (
    <>
      <Grid padding="16px">
        <Text size="32px" bold>로그인</Text>
        <Grid padding="16px 0px">
          <Input 
            value={id}
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input 
            value={pwd}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            is_submit
            onSubmit={login}
          />
        </Grid>

        <Button 
          text="로그인하기" 
          _onClick={login}>
        </Button>
      </Grid>
    </>
  );
};

export default Login;