import {CircularProgress} from '@mui/material';
import {useSelector} from 'react-redux';

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

export default function LoadingWrapper({children}) {
  const isLoading = useSelector(({isLoading}) => isLoading);
  return (
    <>
      {isLoading && (
        <div style={backgroundStyle}>
          <CircularProgress />
        </div>
      )}
      {children}
    </>
  );
}
