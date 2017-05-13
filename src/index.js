import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HelloWorld from './HelloWorld'
import './index.css';

var SecondClass =React.createClass({
    render:function () {
        return (
            <h1>SecondClass,{this.props.name}</h1>
        )
    }
});

ReactDOM.render(
  <SecondClass name="buzheng"/>,
  document.getElementById('root')
);
