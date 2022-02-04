import React from 'react';
import { Grid, Text, Input, Button } from '../elements';

const Signup = (props) => {
  return (
    <>
      <Grid>
        <Text size="32px" bold>회원가입</Text>
        <Grid padding="16px 0px">
          <Input 
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={() => {
              console.log("아이디 입력완료!");
            }}
          />
        </Grid>
        
        <Grid padding="16px 0px">
          <Input 
            label="닉네임"
            placeholder="닉네임를 입력해주세요."
            _onChange={() => {
              console.log("닉네임 입력완료!");
            }}
          />
        </Grid>
        
        <Grid padding="16px 0px">
          <Input 
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={() => {
              console.log("비밀번호 입력완료!");
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input 
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={() => {
              console.log("비밀번호 다시 입력완료!");
            }}
          />
        </Grid>
        
        <Button 
          text="회원가입하기" 
          _onClick={() => {
            console.log("회원가입 했습니다.")
          }}>
        </Button>
      </Grid>
    </>
  );
};

Signup.defaultProps = {

};

export default Signup;