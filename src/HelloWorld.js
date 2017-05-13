import React, { Component } from 'react';
/**
 * Created by buzheng on 17/5/13.
 * 1、组件方式开发  首先自定义一个组件  类似HelloWorld extends Component
 * 2、在index.js文件中导入该组件并使用它即可
 */

class HelloWorld extends Component{
    render(){
        return (
            <h1>HelloWorld</h1>
        )
    }
}
export default HelloWorld;
