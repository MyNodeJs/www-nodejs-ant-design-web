import React from 'react';
import { Menu, Icon } from 'antd';
import FAIcon from './faicon/FAIcon';
import {Link} from 'react-router'
const SubMenu = Menu.SubMenu;
import MyForm from '../component/myform/MyForm'
import Dashboard from '../component/dashboard/Dashboard'
import MyTime from '../component/mytime/MyTime'
const openAll = false;
/*
 * 左侧菜单与路由公用的数据
 * open：是否展开
 * current：是否是当前菜单
 * path：对应地址
 * component：对应渲染的组件
 * */
var menusAndRouts = [
    {key: '1', text: '主面板', icon: 'fa-tachometer'/*, open: true*/},
    {key: '11', parentKey: '1', text: '仪表盘', icon: 'fa-arrow-right', /* current: true,*/ path: '/dashboard1', component: Dashboard},
    {key: '12', parentKey: '1', text: '三级导航', icon: 'fa-th-list'},
    {key: '121', parentKey: '12', text: '我的表单', icon: 'fa-arrow-right', path: '/myForm1', component: MyForm},
    {key: '122', parentKey: '12', text: '我的时间', icon: 'fa-arrow-right', path: '/myTime1', component: MyTime},

    {key: '2', text: '商务查询', icon: 'fa-binoculars'},
    {key: '21', parentKey: '2', text: '仪表盘222', icon: 'fa-arrow-right', path: '/dashboard2', component: Dashboard},
    {key: '22', parentKey: '2', text: '三级导航222', icon: 'fa-th-list'},
    {key: '221', parentKey: '22', text: '我的表单', icon: 'fa-arrow-right', path: '/myForm2', component: MyForm},
    {key: '222', parentKey: '22', text: '我的时间', icon: 'fa-arrow-right', path: '/myTime2', component: MyTime},

    {key: '3', text: '用户列表', icon: 'fa-th-list'},
    {key: '31', parentKey: '3', text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard3', component: Dashboard},
    {key: '32', parentKey: '3', text: '我的表单', icon: 'fa-arrow-right', path: '/myForm3', component: MyForm},
    {key: '33', parentKey: '3', text: '我的时间', icon: 'fa-arrow-right', path: '/myTime3', component: MyTime},

    {key: '4', text: '我的', icon: 'fa-user'},
    {key: '41', parentKey: '4', text: '我的邮件', icon: 'fa-arrow-right', path: '/dashboard4', component: Dashboard},
    {key: '42', parentKey: '4', text: '我的提醒', icon: 'fa-arrow-right', path: '/myForm4', component: MyForm},
    {key: '43', parentKey: '4', text: '个人设置', icon: 'fa-arrow-right', path: '/myTime4', component: MyTime}

];

/*
 * 根据menusAndRouts数据构造出菜单数据和路由数据。
 * rows：菜单数据。
 * collapse：菜单状态
 *           true：收起（小菜单）状态
 *           false：展开（大菜单）状态
 */
function convert(rows, collapse) {
    function exists(rows, parentKey) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].key == parentKey) return true;
        }
        return false;
    }

    var menus = [];
    var routs = [];
    var openKeys = [];
    var current = '';
    var oriMenus = {};
    // 获得所有顶级菜单 处理菜单初始化状态
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        row.subMenus = [];//存放当前菜单的子菜单
        oriMenus[row.key] = row;
        if (openAll) {
            if (!row.path) {
                openKeys.push(row.key);
            }
        } else if (row.open) {
            openKeys.push(row.key);
        }
        if (row.current) {
            current = row.key;
        }
        if (!exists(rows, row.parentKey)) {
            routs.push(row);
            menus.push(
                <SubMenu key={row.key} title={<span><FAIcon type={row.icon} />{collapse?'':row.text}</span>}>
                    {row.subMenus}
                </SubMenu>
            )
        }
    }
    var toDo = [];
    for (let i = 0; i < routs.length; i++) {
        toDo.push(routs[i]);
    }
    while (toDo.length) {
        var node = toDo.shift();// 父菜单
        var subMenus = node.subMenus;
        // 处理子菜单
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.parentKey == node.key) {
                var child = row;
                if (child.path) {//含有path,就说明没有子菜单了.
                    subMenus.push(
                        <Menu.Item key={child.key}>
                            <FAIcon type={child.icon}/>
                            <Link to={child.path} activeClassName="active">{child.text}</Link>
                        </Menu.Item>
                    );
                } else {// 含有子菜单
                    subMenus.push(
                        <SubMenu key={child.key} title={<span><FAIcon type={child.icon} />{child.text}</span>}>
                            {child.subMenus}
                        </SubMenu>
                    );
                }
                if (node.childRoutes) {
                    node.childRoutes.push(child);
                } else {
                    node.childRoutes = [child];
                }
                toDo.push(child);
            }
        }

    }
    return {
        menus,//等同于"menus":menus 或者 menus:menus ES6对象属性的简写方式。
        routs,//具有层级关系的路由
        oriMenus,
        openKeys,
        current
    };
}// end of convert(rows, collapse)

var collapseData = convert(menusAndRouts, true);
var noCollapseData = convert(menusAndRouts, false);
export var menuRouts = noCollapseData.routs;
export var oriMenus = menusAndRouts;
export function getMenus(collapse) {
    return collapse ? collapseData : noCollapseData;
}
