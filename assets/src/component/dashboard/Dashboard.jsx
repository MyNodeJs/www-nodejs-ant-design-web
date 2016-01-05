import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {message, Breadcrumb, Button } from 'antd'
import Page from '../page/Page';
import Request from '../request/Request';
var hideLoading = null;
/*
 * 更新state之后触发的方法:
 * shouldComponentUpdate
 * componentWillUpdate
 * render
 * componentDidUpdate
 *
 * 向DOM中加入组件触发的方法:
 * getDefaultProps //在组件类创建的时候调用一次,以后在向DOM中添加组件就不会调用此方法.
 * getInitialState
 * componentWillMount
 * render
 * componentDidMount //发送 AJAX 请求，可以在该方法中执行这些操作
 *
 * 组件从 DOM 中移除的时候立刻被调用
 * componentWillUnmount
 * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
 * componentWillReceiveProps
 *
 *
 * */
/*
 * 组件是 React 里复用代码最佳方式，但是有时一些复杂的组件间也需要共用一些功能。
 * 有时会被称为 跨切面关注点。React 使用 mixins 来解决这类问题。
 * */
var SetIntervalMixin = {
    getInitialState(){
        return {
            loadingClass: ''
        }
    },
    componentWillMount: function () {
        this.intervals = [];
    },
    setInterval: function () {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function () {
        this.intervals.map(clearInterval);
        /*
         * 组件被移除DMO,清除未完成的ajax
         * */
        this.req.abort();
        if (this.hideLoading) {
            this.hideLoading();
            this.hideLoading = null;
        }
    },
    get(options){
        let that = this;
        that.hideLoading = message.loading('正在加载...', 0);
        that.setState({
            loadingClass: 'loading'
        });
        that.req = Request
            .get(options.url)
            .query(options.data)
            .end(function (err, res) {
                options.end(err, res);
                if (that.hideLoading) {
                    that.hideLoading();
                    that.hideLoading = null;
                }
                that.setState({
                    loadingClass: ''
                });
            });
    }

};
const Dashboard = React.createClass({
    /*
     * 在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
     * */
    getInitialState(){
        console.log('getInitialState');
        return {
            seconds: 0,
            testAjax: 'testAjax'
        }
    },
    /*
     * 在组件类创建的时候调用一次，然后返回值被缓存下来。
     * 如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
     * */
    getDefaultProps(){
        console.log('getDefaultProps');
        return {
            test: 'I\'m a test'
        }
    },
    /*
     * 指定props类型,如果类型不对,浏览器控制台会输出警告,但是不会抛错.
     * */
    propTypes: {
        test: React.PropTypes.string
    },
    /*
     * 引用 mixin
     * */
    mixins: [SetIntervalMixin],
    /*
     * statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
     * 调用方法:Dashboard.customMethod('bar')
     *
     * 在这个块儿里面定义的方法都是静态的，意味着你可以在任何组件实例创建之前调用它们，这些方法不能获取组件的 props 和 state。
     * 如果你想在静态方法中检查 props 的值，在调用处把 props 作为参数传入到静态方法。
     * */
    statics: {
        customMethod: function (foo) {
            return foo === 'bar';
        }
    },
    /*
     * 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。
     * 如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
     * */
    componentWillMount(){
        console.log('componentWillMount');
    },
    /*
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     *
     * 如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
     * */
    componentDidMount: function () {
        console.log('componentDidMount');
        //console.log(this.getDOMNode());// 过时了
        //console.log(ReactDOM.findDOMNode(this));
        this.setInterval(this.tick, 1000); // 调用 mixin 的方法
        let that = this;
        that.get({
            url: '/dashboard.json',
            data: {query: 'Manny', range: '1..5', order: 'desc'},
            end(err, res) {
                console.log(err, res);
                console.log(res.body);
                that.setState({
                    testAjax: res.body.name
                });
            }
        });

    },
    /*
     * 在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。
     * 如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
     * */
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        return true;
    },
    /*
     * 在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
     * 使用该方法做一些更新之前的准备工作。
     * */
    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate');

    },
    /*
     * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
     * 使用该方法可以在组件更新之后操作 DOM 元素。
     * */
    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate');
    },
    /*
     * 在组件从 DOM 中移除的时候立刻被调用。
     * 在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
     * 清理未返回的ajax??
     * */
    componentWillUnmount(){
        console.log('componentWillUnmount');
    },
    /*
     * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
     * 用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。
     * 在该函数中调用 this.setState() 将不会引起第二次渲染。
     * */
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
    },
    tick: function () {
        this.setState({seconds: this.state.seconds + 1});
    },
    handleClick(){
        let that = this;
        that.get({
            url: '/dashboard.json',
            data: {query: 'Manny', range: '1..5', order: 'desc'},
            end(err, res) {
                console.log(err, res);
                console.log(res.body);
                that.setState({
                    testAjax: res.body.name
                });
            }
        });
    },
    render() {
        console.log('render');
        return (
            <Page className={this.state.loadingClass}>
                <div id="admin-page-header" className="admin-page-header">
                    <h1 className="admin-page-header-title">Dashboard</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
                        <Breadcrumb.Item>某应用</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="admin-page-content">
                    <div className={"admin-page-content-inner "}>
                        <div className="dashboard">
                            <Button type="primary" onClick={this.handleClick}>发起ajax请求</Button>
                            <Button>次按钮</Button>
                            <Button type="ghost">幽灵按钮</Button>
                            <Button type="dashed">虚线按钮</Button>
                            <p>npm run server 运行一个server 并且打开默认浏览器！</p>
                            <p>开发过程中，修改文件，浏览器会自动刷新，特别适合双屏/大屏开发！</p>
                            <p>随着项目复杂度的增加，不知道会不会慢。目前的相应速度还是可以接受的。</p>
                            <p>希望不卡吧。哈哈。写起来真的就挺爽了。一保存浏览器就自动刷新了。想你的时候，你在哪里？</p>
                            <p>如何优化构建速度？哈哈快一些</p>
                            <p>{this.props.test}</p>
                            <p>
                                React has been running for {this.state.seconds} seconds.
                            </p>
                            <p>ajax result: {this.state.testAjax}</p>
                        </div>

                    </div>
                </div>
            </Page>
        );
    }
});
console.log(Dashboard.customMethod('bar'));
export default Dashboard;