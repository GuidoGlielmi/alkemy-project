import {useEffect} from 'react';
import {clearUserFeedbackMsg} from 'redux/actions/tasksActions';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {ToastContainer, toast} from 'react-toastify';

export default function UserFeedbackModal() {
  const dispatch = useAppDispatch();
  const {userFeedbackMsg, error} = useAppSelector((state) => state);
  useEffect(() => {
    const onClose = () => dispatch(clearUserFeedbackMsg());
    if (error) toast.error(userFeedbackMsg || 'Ha ocurrido un error', {onClose});
    else if (userFeedbackMsg) toast(userFeedbackMsg, {onClose});
  }, [dispatch, userFeedbackMsg, error]);

  return <ToastContainer pauseOnHover />;
}
