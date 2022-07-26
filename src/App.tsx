import {lazy, Suspense} from 'react';
import {Routes, Route, useLocation, Outlet, Navigate} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import Header from 'components/header/Header';
import Login from 'views/login/Login';
import Register from 'views/register/Register';
import UserFeedbackModal from 'components/user-feedback-modal/UserFeedbackModal';
import {useAppSelector} from 'redux/hooks';

// import { validate } from 'uuid';

const Error404 = lazy(() => import('./views/error404/Error404'));
const Tasks = lazy(() => import('./views/tasks/Tasks'));

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const MotionWrapper = () => (
  <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
    <Outlet />
  </motion.div>
);

const SuspenseWrapper = () => (
  <Suspense fallback={<>...</>}>
    <Outlet />
  </Suspense>
);

export default function App() {
  const {isLoggedIn} = useAppSelector((state) => state);
  const location = useLocation();
  return (
    <AnimatePresence>
      <UserFeedbackModal />
      <Routes location={location} key={location.pathname}>
        <Route element={<MotionWrapper />}>
          <Route element={<SuspenseWrapper />}>
            <Route element={<Header />}>
              <Route path='/' element={isLoggedIn ? <Tasks /> : <Navigate to='/login' />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<SuspenseWrapper />}>
            <Route path='*' element={<Error404 />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
