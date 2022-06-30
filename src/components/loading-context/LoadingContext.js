import { createContext, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
export const loadingContext = createContext('');

const backgroundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.1)',
};

export default function LoadingContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ isLoading, setIsLoading }}>
      <>
        {isLoading && (
          <div style={backgroundStyle}>
            <CircularProgress />
          </div>
        )}
        {children}
        <ToastContainer pauseOnHover />
      </>
    </loadingContext.Provider>
  );
}
