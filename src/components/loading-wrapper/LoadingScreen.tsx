import {CircularProgress} from '@mui/material';
import {useAppSelector} from 'redux/hooks';

const backgroundStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.1)',
};

export default function LoadingScreen() {
  const isLoading = useAppSelector(({isLoading: loading}) => loading);
  return (
    isLoading && (
      <div style={backgroundStyle}>
        <CircularProgress />
      </div>
    )
  );
}
