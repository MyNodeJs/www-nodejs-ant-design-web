webpackJsonp([7,12],{10:/*!*************************************!*\
  !*** ./src/framework/page/Page.jsx ***!
  \*************************************/
function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0}),a(11);var r=a(1),d=n(r),s=a(9),u=a(13),l=a(22),o=a(20),m=a(15),c=n(m),p=a(16),h=n(p),f=d["default"].createClass({displayName:"Page",getInitialState:function(){return{pageHeader:"",showPageAnimate:c["default"].pageAnimate()}},getDefaultProps:function(){return{loading:!1,animConfig:[{opacity:[1,0],translateY:[0,50]},{opacity:[1,0],translateY:[0,-50]}]}},getPageHeaderDateByMenu:function(){for(var e=(0,o.getCurrentSidebarMenu)(),t=e?e.parentText:[],a=e?e.text:"",n=[],i=0;i<t.length;i++)n.push({text:t[i]});return n.push({text:a}),{title:a,breadcrumbItems:n}},setPageHeader:function(){var e="",t=null;if("auto"===this.props.header?t=this.getPageHeaderDateByMenu():"object"==i(this.props.header)&&(this.props.header.title||this.props.header.breadcrumbItems?(t={},"auto"===this.props.header.title?t.title=this.getPageHeaderDateByMenu().title:this.props.header.title?t.title=this.props.header.title:t.title=" ","auto"===this.props.header.breadcrumbItems?t.breadcrumbItems=this.getPageHeaderDateByMenu().breadcrumbItems:this.props.header.breadcrumbItems?t.breadcrumbItems=this.props.header.breadcrumbItems:t.breadcrumbItems=""):e=this.state.showPageAnimate?d["default"].createElement("div",{className:"admin-page-header"},d["default"].createElement(s.QueueAnim,{animConfig:this.props.animConfig},d["default"].createElement("div",{key:"queue-anim-item1"},this.props.header))):d["default"].createElement("div",{className:"admin-page-header"},this.props.header)),t){var a=(0,l.getCurrentHeaderMenu)(),n=[];a&&n.push(d["default"].createElement(s.Breadcrumb.Item,{key:"page-breadcrumb-item-home"},d["default"].createElement(u.Link,{to:a.path},a.text)));for(var r=t.breadcrumbItems,o=0;o<r.length;o++){var m=r[o],c="page-breadcrumb-item"+o;n.push(m.path?d["default"].createElement(s.Breadcrumb.Item,{key:c},d["default"].createElement(u.Link,{to:m.path},m.text)):d["default"].createElement(s.Breadcrumb.Item,{key:c},m.text))}var p="";t.breadcrumbItems&&(p=d["default"].createElement(s.Breadcrumb,null,n)),e=this.state.showPageAnimate?d["default"].createElement("div",{className:"admin-page-header"},d["default"].createElement(s.QueueAnim,{animConfig:this.props.animConfig},d["default"].createElement("div",{key:"queue-anim-item1"},d["default"].createElement("h1",{className:"admin-page-header-title"},t.title),p))):d["default"].createElement("div",{className:"admin-page-header"},d["default"].createElement("h1",{className:"admin-page-header-title"},t.title),p)}this.setState({pageHeader:e})},switchLoadingMessage:function(){this.props.loading?!this.hideLoading:this.hideLoading&&this.hideLoading()},componentWillUpdate:function(){this.switchLoadingMessage()},componentDidUpdate:function(){this.switchLoadingMessage()},componentWillMount:function(){},componentDidMount:function(){var e=this;h["default"].subscribeOnceAcceptOldMsg("set-header-breadcrumb",function(){e.setPageHeader()})},componentWillUnmount:function(){this.hideLoading&&this.hideLoading()},render:function(){var e=d["default"].createElement(s.Spin,{spining:this.props.loading},this.props.children);return this.state.showPageAnimate&&(e=d["default"].createElement(s.QueueAnim,{animConfig:this.props.animConfig,delay:100},d["default"].createElement("div",{key:"queue-anim-item1"},e))),d["default"].createElement("div",{className:"admin-page "},d["default"].createElement("div",{className:"admin-page-content"},d["default"].createElement("div",{className:"admin-page-content-inner"},this.state.pageHeader,e)))}});t["default"]=f,e.exports=t["default"]},11:/*!***************************************!*\
  !*** ./src/framework/page/style.less ***!
  \***************************************/
function(e,t){},449:/*!**********************************************!*\
  !*** ./src/page/profile/ProfilePassWord.jsx ***!
  \**********************************************/
function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(1),r=n(i),d=a(10),s=n(d),u=r["default"].createClass({displayName:"NewMail",getInitialState:function(){return{loading:!1}},componentDidMount:function(){},render:function(){return r["default"].createElement(s["default"],{header:"auto",loading:this.state.loading},r["default"].createElement("h5",null,"修改密码"))}});t["default"]=u,e.exports=t["default"]}});
//# sourceMappingURL=7.js.map