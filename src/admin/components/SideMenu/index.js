import { AccountBookOutlined, BarChartOutlined, BarsOutlined, DatabaseOutlined, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons'
import {  Menu} from 'antd'
import Title from 'antd/es/typography/Title';
import React from 'react'
import { useNavigate } from 'react-router-dom';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Thống Kê', '/admin', <BarChartOutlined />),
  getItem('Đơn Hàng', '/admin/order', <AccountBookOutlined />),
  getItem('Loại Sản Phẩm', 'sub1', <BarsOutlined />, [
    getItem('Tạo Mới', '/admin/category/create', <PlusOutlined />),
    getItem('Hiển Thị Toàn Bộ', '/admin/category', <MenuUnfoldOutlined />)
  ]),
  getItem('Sản Phẩm', 'sub2', <DatabaseOutlined />, [
    getItem('Tạo Mới', '/admin/product/create', <PlusOutlined />),
    getItem('Hiển Thị Toàn Bộ', '/admin/product', <MenuUnfoldOutlined />)
  ]),
  getItem('Nhà Cung Cấp', 'sub3', <IdcardOutlined />, [
    getItem('Tạo Mới', '/admin/producer/create', <PlusOutlined />),
    getItem('Hiển Thị Toàn Bộ', '/admin/producer', <MenuUnfoldOutlined />)
  ]),
  getItem('Khách Hàng', '/admin/customer', <TeamOutlined />),
];

const SideMenu = () => {
  const navigate = useNavigate()
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '16vw'}}> 
      <Title level={3} style={{ backgroundColor: "#5c85d6", color: 'white', textAlign: 'center', paddingTop: '15px', margin: 0, width: '100%', height: '10vh'}}>
        Quản Trị Hệ Thống
      </Title>
      <Menu
        theme='dark'
        onClick={onClick}
        style={{
          width: '100%',
          height: '90vh'
        }}
        selectedKeys={[1]}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default SideMenu