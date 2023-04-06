import {  ImportOutlined, WalletOutlined } from '@ant-design/icons'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Header from 'admin/components/Header'
import SideMenu from 'admin/components/SideMenu'
import { Button, Input, Select, Space, Typography, Form, message } from 'antd'
import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
const CreateProduct = () => {
    
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
            <Typography.Title level={3} style={{ padding: '10px' }}><WalletOutlined />Thêm Mới Sản Phẩm</Typography.Title>
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
              label={<Typography style={{ display: 'flex', alignItems: 'center'}}>Tên Sản Phẩm</Typography>}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống tên sản phẩm!',
                },
              ]}
            >
              <Input placeholder='Điền tên danh mục...' />
            </Form.Item>
            <Space>
              <Form.Item
                name="cate"
                label="Loại sản phẩm"
                rules={[
                  {
                    required: true,
                    message: 'Không được để trống phần này'
                  }
                ]}
              >
              <Select placeholder="[--Chọn loại sản phẩm--]">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
              </Form.Item>
              <Form.Item
                name="producer"
                label="Nhà cung cấp"
                rules={[
                  {
                    required: true,
                    message: 'Không được để trống phần này'
                  }
                ]}
              >
              <Select placeholder="[--Chọn nhà cung cấp--]">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
              </Form.Item>
            </Space>
            <Form.Item
              label="Mô tả ngắn"
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              label="Chi tiết sản phẩm"
            >
            <CKEditor
              editor={ ClassicEditor }
              config={ {
                  plugins: [ Paragraph, Bold, Italic, Essentials ],
                  toolbar: [ 'bold', 'italic' ]
              } }
              data="<p>Hello from the first editor working with the context!</p>"
              onReady={ editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log( 'Editor1 is ready to use!', editor );
              } }
            />
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

export default CreateProduct