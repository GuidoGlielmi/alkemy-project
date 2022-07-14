import {lazy, Suspense, useContext, useCallback} from 'react';
import {Routes, Route, Navigate, useLocation, Outlet} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {authContext} from 'components/auth-context/AuthContext';
import Header from 'components/header/Header';
import Login from 'views/login/Login';
import Register from 'views/register/Register';
import Tasks from 'views/tasks/Tasks';

// import { validate } from 'uuid';

const Error404 = lazy(() => import('./views/error404/Error404'));

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
  const {token} = useContext(authContext);
  const RequireAuth = useCallback(() => (token ? <Outlet /> : <Navigate to='/login' />), []);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<MotionWrapper />}>
          {/* <Route element={<RequireAuth />}> */}
          <Route element={<SuspenseWrapper />}>
            <Route element={<Header />}>
              <Route path='/' element={<Tasks />} />
            </Route>
          </Route>
          {/* </Route> */}
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
