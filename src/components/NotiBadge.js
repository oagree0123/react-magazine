import React, { useEffect, useState } from 'react';
import { 
  ref, 
  onValue,
  off,
  update,
} from "firebase/database";
import { useSelector } from 'react-redux';
import { Badge } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';

import { realtime } from "../shared/firebase";

const NotiBadge = (props) => {
  const user_id = useSelector(state => state.user.user.uid);

  const [is_read, setIsRead] = useState(true);
  const notiCheck = () => {
    const notiDB = ref(realtime, `noti/${user_id}`);
    update(notiDB, { read: true });
    props._onClick();
  };

  useEffect(() => {
    const notiDB = ref(realtime, `noti/${user_id}`);

    onValue(notiDB, (snapshot) => {
      setIsRead(snapshot.val().read);
    });

    return () => off(notiDB);
  }, [])

  return (
    <>
      <Badge 
        color="secondary" 
        variant="dot" 
        invisible={is_read} 
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
}

export default NotiBadge;