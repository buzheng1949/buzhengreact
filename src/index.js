import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HelloWorld from './HelloWorld'
import './index.css';
/**
 * React.createClass 方法用于生成一个组件类 HelloMessage。
 * 如果我们需要向组件传递参数，可以使用 this.props 对象
 * name 属性通过 this.props.name 来获取
 */
var SecondClass = React.createClass({
    render: function () {
        return (
            <h1>SecondClass,{this.props.name}</h1>
        )
    }
});

var WebCompoment = React.createClass({
    render: function () {
        return (
            <section>
                <SecondClass name="buzheng"/>
                <WebName name={this.props.name}/>
                <WebLink site={this.props.site}/>
            </section>
        )
    }
});

var WebName = React.createClass({
    render: function () {
        return (
            <h1>{this.props.name}</h1>
        )
    }
});

var WebLink = React.createClass({
    render: function () {
        return (
            <a href={this.props.site}>{this.props.site}</a>
        )
    }
});

ReactDOM.render(
    <WebCompoment name="buzhengblog" site="https://buzheng1949.github.io"/>,
    document.getElementById('root')
);
