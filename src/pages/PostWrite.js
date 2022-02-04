import React from 'react';

import { Grid, Text, Button, Image, Input } from '../elements'
import Upload from '../shared/Upload';

const PostWrite = (props) => {
  return (
    <>
      <Grid padding="16px">
        <Text size="36px" bold>게시글 작성</Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>미리보기</Text>
        </Grid>

        <Image shape="rectangle" />
      </Grid>

      <Grid padding="16px">
        <Input label="게시글 내용" placeholdr="게시글 작성" multiLine></Input>
      </Grid>

      <Grid padding="16px">
        <Button>게시글 작성</Button>
      </Grid>
    </>
  );
};

export default PostWrite;