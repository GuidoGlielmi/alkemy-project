import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HashRouter>
    {/* to use BrowserRouter in github pages, it is necessary to use HashRouter because on every refresh, it will try to access the exact path we are in, and given React builds SPA, it wont work  */}
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </React.StrictMode>,
);
reportWebVitals();
