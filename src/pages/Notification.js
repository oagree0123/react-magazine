import React from 'react';
import Card from '../components/Card';

import { Grid } from '../elements';

const Notification = (props) => {
  let noti = [
    {user_name: "aaaa",post_id: "post1",image_url: "",},
    {user_name: "aaaa",post_id: "post2",image_url: "",},
    {user_name: "aaaa",post_id: "post3",image_url: "",},
    {user_name: "aaaa",post_id: "post4",image_url: "",},
    {user_name: "aaaa",post_id: "post5",image_url: "",},
    {user_name: "aaaa",post_id: "post6",image_url: "",},
    {user_name: "aaaa",post_id: "post7",image_url: "",},
  ];

  return (
    <>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((v) => {
          return (
            <Card key={v.post_id} {...v} />
          );
        })}
      </Grid>
    </>
  );
};

export default Notification;