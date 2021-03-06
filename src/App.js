import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import './App.less';

class App extends React.Component {
    componentDidMount() {
        axios.get('/api1/get/list').then(res => {
            console.log(res, 'res.......res....');
        });

        axios.get('/test/get/demo').then(res => {
            console.log(res, 'res.......res....');
        });
    }
    render() {
        return <div className="container">
            <div><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/154c9711cfee46b68400f4f1eedb9983~tplv-k3u1fbpfcp-watermark.image" /></div>
            <div className="title">这是风恋猫的脚手架，持续更新中敬请期待...</div>
            <div className="title">updating...</div>
        </div>
    }
}

ReactDom.render(<App />, document.getElementById('root'))