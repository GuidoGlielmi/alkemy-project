import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import {clearUserFeedbackMsg} from 'redux/actions/tasksActions';
import 'react-toastify/dist/ReactToastify.css';

export default function UserFeedbackModal() {
  const dispatch = useDispatch();
  const {userFeedbackMsg, error} = useSelector(state => state);
  useEffect(() => {
    const onClose = () => dispatch(clearUserFeedbackMsg());
    if (error) toast.error(userFeedbackMsg || 'Ha ocurrido un error', {onClose});
    else if (userFeedbackMsg) toast(userFeedbackMsg, {onClose});
  }, [dispatch, userFeedbackMsg, error]);

  return <ToastContainer pauseOnHover />;
}
