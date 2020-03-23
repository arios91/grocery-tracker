import React, {useState} from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Stores from './components/Stores';
import StoreInput from './components/StoreInput';
import './App.css';
import db from './firebase';

//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App w-100 h-100">
        <Alert/>
        <Navbar/>
        <Stores/>
        {/* <StoreInput/> */}
        <Footer/>
      </div>

    </Provider>

  );
}

export default App;
