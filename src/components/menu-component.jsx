import React, { useState } from 'react';
import {
    HomeOutlined,
    ContainerOutlined,
    CodepenOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

function getItem(
    title,
    label,
    key,
    icon,
    children
) {
    return {
        key,
        icon,
        children,
        label,
        title
    }
}

const items = [
    getItem('Home', 'Home', '/home', <HomeOutlined />),
    getItem('Code', 'Codes', '/codes', <CodepenOutlined />),
    getItem('Graph', 'Graph', '/graph', <ContainerOutlined />),
    getItem('Grid', 'Grids', '', <AppstoreOutlined />, [
        getItem('Grid', 'Create a Grid', '/grid'),
        getItem('Search For a Grid', 'Search For a Grid', '')
    ]),
    getItem('Logout', 'Logout', '/', <LogoutOutlined />),
];

const MenuComponent = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('/home');
    const rightStyle = { position: 'absolute', top: 50, right: 0, 'zIndex': '1000' };
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const navigateRespectiveRoute = (key, item) => {
        if (key === '') {
            return;
        }

        if (key === '/') {
            props.setLoggedIn(false);
            props.setPageHeader('Login Page');
            navigate(key);
            return;
        }
        setCollapsed(!collapsed);
        setSelectedKey(key);
        props.setPageHeader(item.props.title + ' Page');
        navigate(key);
    }

    return (
    <>
        <Button type="primary" style={{ position: 'absolute', top: 10, right: 10 }} onMouseEnter={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {
            collapsed && <Menu
                defaultSelectedKeys={[selectedKey]}
                defaultOpenKeys={[]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                style={rightStyle}
                onClick={({ key, item}) => navigateRespectiveRoute(key, item)}
                onMouseLeave={toggleCollapsed}
            />
        }
    </>
    );
};

export default MenuComponent;