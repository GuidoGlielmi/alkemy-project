import {useEffect} from 'react';
import {clearUserFeedbackMsg} from 'redux/slices/tasksSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserFeedbackModal() {
  const dispatch = useAppDispatch();
  const {feedbackMsg, errorFeedbackMsg} = useAppSelector(state => state);
  useEffect(() => {
    const onClose = () => dispatch(clearUserFeedbackMsg());
    if (errorFeedbackMsg) toast.error(errorFeedbackMsg, {onClose});
    else if (feedbackMsg) toast(feedbackMsg, {onClose});
  }, [dispatch, feedbackMsg, errorFeedbackMsg]);

  return <ToastContainer pauseOnHover />;
}
