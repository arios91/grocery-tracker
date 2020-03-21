import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Stores from './components/Stores';
import ListItem from './components/ListItem';
import List from './components/List';
import ActionCenter from './components/ActionCenter';
import {fetchToDos} from './actions/stores';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  fetchToDos();

  return (
    <Provider store={store}>
      <div className="App w-100 h-100">
        <Navbar/>
        <ActionCenter/>
        <Stores/>
        <List/>
        {/* <ListItem/> */}

      </div>

    </Provider>

  );
}

export default App;
