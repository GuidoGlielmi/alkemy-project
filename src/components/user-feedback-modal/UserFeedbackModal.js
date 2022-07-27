import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import {clearUserFeedbackMsg} from 'redux/actions/tasksActions';
import 'react-toastify/dist/ReactToastify.css';

export default function UserFeedbackModal() {
  const dispatch = useDispatch();
  const {feedbackMsg, errorFeedbackMsg} = useSelector(state => state);
  useEffect(() => {
    const onClose = () => dispatch(clearUserFeedbackMsg());
    if (errorFeedbackMsg) toast.error(errorFeedbackMsg, {onClose});
    else if (feedbackMsg) toast(feedbackMsg, {onClose});
  }, [dispatch, feedbackMsg, errorFeedbackMsg]);

  return <ToastContainer pauseOnHover />;
}
