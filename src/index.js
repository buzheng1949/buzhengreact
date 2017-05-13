import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HelloWorld from './HelloWorld'
import './index.css';
import $ from 'jquery'
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

/**
 * React State状态
 * React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
 ＊React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
 ＊以下实例中创建了 LikeButton 组件，getInitialState 方法用于定义初始状态，也就是一个对象，
 ＊这个对象可以通过 this.state 属性读取。
 ＊当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
 */
var LikeButton = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'buzheng'
        }
    },
    getInitialState: function () {
        return {
            liked: false
        }
    },
    handleClick: function () {
        this.setState({liked: !this.state.liked})
    },
    render: function () {
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <section>
                <p>{this.props.name}</p>
                <p onClick={this.handleClick}>
                    你<b>{text}</b>我。
                </p>
            </section>

        )
    }
});

//演示setState用法

var ClickCount = React.createClass({
    getInitialState: function () {
        return {
            clickcount: 0
        }
    }
    ,
    handleClick: function () {
        this.setState(function (state) {
            return {clickcount: state.clickcount + 1}
        })
    },
    render: function () {
        return (
            <h1 onClick={this.handleClick}>clickout is {this.state.clickcount}</h1>
        )
    }
});


//第二次书写

var HelloCount = React.createClass({
    getInitialState: function () {
        return {
            clickcount: 1
        }
    },
    handleClick: function () {
        this.setState(function (state) {
            return {
                clickcount: this.state.clickcount + 1
            }
        })
    },
    render: function () {
        return (
            <h1 onClick={this.handleClick}>点击我{this.state.clickcount}次</h1>
        )
    }
});

//组件的生命周期
var Timer = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        }
    },
    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },
    render: function () {
        return (
            <h1 style={{opacity: this.state.opacity}}>HelloBuzheng</h1>
        )
    }
});

//Ajax请求
var AjaxDeom = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            address: ''
        }
    },
    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
                name: lastGist.owner.login,
                address: lastGist.html_url
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {
        return (
            <section>
                <h1>the user name is {this.state.name}</h1>
                <h1>the user 's is {this.state.address}</h1>
            </section>
        )
    }
});

//演示表单交互之单个组件 点击以及输入的 MVVM
var FormDeom = React.createClass({
    getInitialState: function () {
        return {
            value: 'Hello',
            message: 'Click me to getResult'
        }
    },
    handleChange: function (event) {
        this.setState({value: event.target.value})
    },
    handleClick: function () {
        this.setState(function (event) {
            return ({message: '不正'})
        })

        // this.setState({message:"buzheng"})
    },
    render: function () {
        var value = this.state.value;
        return (
            <section>
                <input type="text" value={value} onChange={this.handleChange}/>
                <h1>the input value is {value}</h1>
                <h1 onClick={this.handleClick}>{this.state.message}</h1>
            </section>
        )
    }
});

//演示表单交互2  实际上  父组件以及子组件的信息交流是通过props去传递的，通过把父类的函数、以及字段去传递
var Son = React.createClass({
    render: function () {
        var value = this.props.value;
        return (
            <section>
                <input type="text" value={value} onChange={this.props.updateStateProp}/>
                <h1>the input value is {value}</h1>
                <h1 onClick={this.props.handleClick}>{this.props.message}</h1>
            </section>

        )
    }
});
var Father = React.createClass({
    getInitialState:function () {
        return{
            value:'buzheng',
            message:'点我'
        }
    }
    ,
    handleClick:function () {
      this.setState({message:'我是不正'})
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        var value = this.state.value;
        return(
            <Son value={value} updateStateProp={this.handleChange} handleClick={this.handleClick} message={this.state.message}></Son>
        )
    }
});

//获取组件里面的数据 
var Data = React.createClass({
    getInitialState:function () {
        return{
            message:'点击我获取前面数据'
        }
    },
    handleClick:function () {
        this.setState({message:this.refs.test.value})
    },
    render:function () {
        return(
            <section>
                <input type="text" value="helloworld" ref='test'/>
                <button onClick={this.handleClick}>{this.state.message}</button>
            </section>
        )
    }
});
ReactDOM.render(
    <Data source="https://api.github.com/users/octocat/gists"/>,
    document.getElementById('root')
);
