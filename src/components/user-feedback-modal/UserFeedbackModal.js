/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import {setUserFeedbackMsg} from 'redux/actions/tasksActions';

export default function UserFeedbackModal({children}) {
  const dispatch = useDispatch();
  const {userFeedbackMsg, error} = useSelector((state) => state);

  useEffect(() => {
    const onClose = () => dispatch(setUserFeedbackMsg({userFeedbackMsg: '', error: false}));
    if (error) toast.error('Ha ocurrido un error', {onClose});
    if (userFeedbackMsg) toast(userFeedbackMsg, {onClose});
  }, [userFeedbackMsg, error]);

  return (
    <>
      {children}
      <ToastContainer pauseOnHover />
    </>
  );
}
