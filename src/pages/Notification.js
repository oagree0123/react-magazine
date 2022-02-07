import React, { useEffect, useState } from 'react';
import { 
  ref,
  orderByChild,
  query,
  onValue,
} from 'firebase/database';
import { realtime } from '../shared/firebase';
import { useSelector } from 'react-redux';

import Card from '../components/Card';
import { Grid } from '../elements';

const Notification = (props) => {
  const user = useSelector(state => state.user.user);

  const [noti, setNoti] = useState([]);

  useEffect(() => {
    if(!user) {
      return;
    }

    const notiDB = ref(realtime, `noti/${user.uid}/list`);
    const _noti = query(notiDB, orderByChild("insert_dt"));

    onValue(_noti, (snapshot) => {
      if(snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data).reverse().map((s) => {
          return _data[s]
        });

        console.log(_noti_list);
        setNoti(_noti_list);
      }
    }, {
      onlyOnce: true
    });

  }, [user]);

  return (
    <>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((v, idx) => {
          return (
            <Card key={`noti_${idx}`} {...v} />
          );
        })}
      </Grid>
    </>
  );
};

export default Notification;