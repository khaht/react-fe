import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';
import 'assets/scss/index.scss';
import App from 'modules/App';
import reportWebVitals from './reportWebVitals';
import configureStore, { history } from './store';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'modules/App'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
