import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Login from './components/views/login/Login';
import Register from './components/views/register/Register';
import Tasks from './components/views/tasks/Tasks.js';
import { AnimatePresence, motion } from 'framer-motion';
import Header from 'components/header/Header';
import { authContext } from 'components/auth-context/AuthContext';
// import { validate } from 'uuid';

const Error404 = lazy(() => import('./components/views/error404/Error404'));

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
  const { token } = useContext(authContext);
  const RequireAuth = () => {
    return token ? <Outlet /> : <Navigate to='/login' /* replace */ />;
  };
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<MotionWrapper />}>
          <Route element={<RequireAuth />}>
            <Route element={<SuspenseWrapper />}>
              <Route element={<Header />}>
                <Route path='/' element={<Tasks />} />
              </Route>
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
