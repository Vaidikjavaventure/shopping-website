// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// // import store from "./store";
// import { Provider } from "react-redux";
// import reportWebVitals from "./reportWebVitals";
// // import * as ReactDOMClient from 'react-dom/client';
// import { BrowserRouter } from "react-router-dom";

// const container = document.getElementById('root');
// const root = ReactDOMClient.createRoot(container);
// root.render(<App />);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// )

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider>
//   <BrowserRouter>
    
//       <App />
    
//   </BrowserRouter>
//   </Provider>
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
