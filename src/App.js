import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/views/login/Login';
import Register from './components/views/register/Register';
import Tasks from './components/views/tasks/Tasks.js';
import { AnimatePresence, motion } from 'framer-motion';
const RequireAuth = ({ children }) => {
  return localStorage.getItem('logger') ? children : <Navigate to='/login' replace />;
};

const Error404 = lazy(() => import('./components/views/error404/Error404'));

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const motionWrapper = (component) => (
  <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
    {component}
  </motion.div>
);

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <RequireAuth>
              motionWrapper(
              <Tasks />)
            </RequireAuth>
          }
        />
        <Route path='/login' element={motionWrapper(<Login />)} />
        <Route path='/register' element={motionWrapper(<Register />)} />
        <Route
          path='*'
          element={motionWrapper(
            <Suspense fallback={<>...</>}>
              <Error404 />
            </Suspense>,
          )}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
