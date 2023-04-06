import { DownloadOutlined, ImportOutlined, WalletOutlined } from '@ant-design/icons'
import Header from 'admin/components/Header'
import SideMenu from 'admin/components/SideMenu'
import { Button, Input, Select, Space, Typography, Form, message } from 'antd'
import React from 'react'

const CreateCategory = () => {
    
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  
  return (
    <>
      <div style={{ display: 'flex', overflowY: 'scroll'}}>
        <SideMenu />
        <div style={{ overflowY: 'scroll', backgroundColor: '#e6e6e6'}}>
          <Header style={{ width: '100%'}} />
          <Space style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography.Title level={3} style={{ padding: '10px' }}><WalletOutlined />Thêm Mới Danh Mục</Typography.Title>
            <div style={{ display: 'flex'}}>
              <Button type="primary"><ImportOutlined />Thoát</Button>
            </div>
          </Space>
          <Form
            form={form}
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            size="large"
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: '30px 0'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
          >
            <Form.Item 
              name="name"
              label={<Typography style={{ display: 'flex', alignItems: 'center'}}>Tên danh mục</Typography>}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống tên danh mục!',
                },
              ]}
            >
              <Input placeholder='Điền tên danh mục...' />
            </Form.Item>
            <Form.Item 
              name="level"
              label="Danh mục cha"
            >
              <Select placeholder="[--Chọn danh mục--]">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              name="parentId"
              label="Sắp xếp"
            >
              <Select placeholder="[--Chọn vị trí--]">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              name="status"
              label="Trạng thái"
            >
              <Select placeholder="[--Chọn trạng thái--]">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green'}}>
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CreateCategory