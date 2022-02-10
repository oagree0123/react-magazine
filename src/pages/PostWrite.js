import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Text, Button, Image, Input, Radio } from '../elements';
import Upload from '../shared/Upload';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const {history} = props;

  const post_id = props.match.params.id;
  const is_edit = post_id? true : false;

  let _post = is_edit? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = useState(_post? _post.contents : "");
  const [type_check, setTypeCheck] = useState("normal");
  const [is_disable, setIsDisable] = useState(false);

  useEffect(() => {
    if((!preview) || (!contents)) {
      setIsDisable(false);
    } else{
      setIsDisable(true);
    }
  }, [preview, contents])

  useEffect(() => {
    if(is_edit && !_post) {
      history.goBack();
      return;
    }

    if(is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, [])

  const changeContents = (e) => {
    setContents(e.target.value);
  }

  const addPost = () => {
    if(!contents) {
      window.alert("내용을 작성해주세요!");
      return;
    }
    if(!preview) {
      window.alert("이미지를 업로드 해주세요!");
      return;
    }
    dispatch(postActions.addPostFB(contents, type_check));
  };

  const editPost = () => {
    if(!contents) {
      window.alert("내용을 작성해주세요!")
      return;
    }
    dispatch(postActions.editPostFB(post_id, {contents: contents}));
  }
  
  if(!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>앗! 잠깐!</Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button _onClick={()=>{history.replace("/");}}>로그인 하러가기</Button>
      </Grid>
    );
  }

  return (
    <>
      <Grid padding="16px">
        <Text size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>

      <Grid is_flex padding="8px 16px">
        <Radio name="post_type" value="left" label="왼쪽정렬" _onChange={()=> {setTypeCheck("left")}} />
        <Radio name="post_type" value="right" label="오른쪽정렬" _onChange={()=> {setTypeCheck("right")}} />
        <Radio name="post_type" value="normal" label="기본정렬" _onChange={()=> {setTypeCheck("normal")}} />
      </Grid>

      <Grid padding="16px">
        <Text margin="0px" size="24px" bold>미리보기</Text>
      </Grid>

      {
        (type_check === "left") ?
          (<Grid is_left>
            <Image 
              shape="rectangle" 
              src={preview? preview : "https://pngimage.net/wp-content/uploads/2018/05/empty-image-png-7.png"} 
            />
            <Grid padding="16px">
              <Input 
                value={contents}
                _onChange={changeContents}
                label="게시글 내용" 
                placeholdr="게시글 작성" 
                multiLine
              ></Input>
            </Grid>
          </Grid>) :
          (type_check === "right") ?
            (<Grid is_right>
              <Grid padding="16px">
                <Input 
                  value={contents}
                  _onChange={changeContents}
                  label="게시글 내용" 
                  placeholdr="게시글 작성" 
                  multiLine
                ></Input>
              </Grid>
              <Image 
                shape="rectangle" 
                src={preview? preview : "https://pngimage.net/wp-content/uploads/2018/05/empty-image-png-7.png"} 
              />
            </Grid>) :
            (<Grid>
              <Image 
                shape="rectangle" 
                src={preview? preview : "https://pngimage.net/wp-content/uploads/2018/05/empty-image-png-7.png"} 
              />
              <Grid padding="16px">
                <Input 
                  value={contents}
                  _onChange={changeContents}
                  label="게시글 내용" 
                  placeholdr="게시글 작성" 
                  multiLine
                ></Input>
              </Grid>
            </Grid>)
      }

      <Grid padding="16px">
        {is_edit ?
        <Button is_disable={is_disable} _onClick={editPost}>게시글 수정</Button>
        : <Button is_disable={is_disable} _onClick={addPost}>게시글 작성</Button>
      }
      </Grid>
    </>
  );
};

export default PostWrite;