import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import quizReducer from './redux/quizReducer';
import QuizBox from './components/QuizBox';
import './App.css';

const store = createStore(quizReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="header">
            <h1>Quiz App</h1>
            <p>A tiny quiz app built with React</p>
        </div>
        <QuizBox />
      </div>
    </Provider>
  );
}

export default App;
