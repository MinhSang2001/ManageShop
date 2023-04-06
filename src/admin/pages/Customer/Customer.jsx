import { CalendarOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined, WalletOutlined } from '@ant-design/icons';
import Header from 'admin/components/Header';
import SideMenu from 'admin/components/SideMenu';
import { Button, Table, Typography, DatePicker, Space, Popover, Input } from 'antd';
import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;


const Customer = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const onChange = (date) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ];
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (index) => <p>{index}</p>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      render: (render) => <p>{render}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },    
    {
      title: 'Thao tác',
      dataIndex: 'action'
    }
  ];
  const data = [
    {
      key: '1',
      id: 1,
      name: 'Akaga',
      email: 'saqdjji@gmail.com',
      phone: '09878783475',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '2',
      id: 2,
      name: 'Akagdầa',
      email: 'saqdgqwgjji@gmail.com',
      phone: '09836783475',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '3',
      id: 3,
      name: 'agihwqoh',
      email: 'kqjjki@gmail.com',
      phone: '09878783475',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '1',
      id: 4,
      name: 'Akaga',
      email: 'saqdjji@gmail.com',
      phone: '09878783475',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '4',
      id: 4,
      name: 'gjqjqwdsa',
      email: 'Khách vãng lai',
      phone: '09878788767',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '5',
      id: 5,
      name: 'ajzjjz',
      email: 'Khách vãng lai',
      phone: '08128783475',
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    
  ];
  
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const onFilterStatus = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  return (
    <div style={{ display: 'flex', overflowY: 'scroll'}}>
      <SideMenu />
        <div style={{ overflowY: 'scroll', backgroundColor: '#e6e6e6'}}>
          <Header />
          <Typography.Title level={3} style={{ padding: '10px' }}><WalletOutlined /> Danh Sách Khách Hàng</Typography.Title>
          <Table
            rowSelection={{
              type: rowSelection,
            }}
            columns={columns}
            onChange={onFilterStatus}
            dataSource={data}
          />
          </div>
    </div>
  )
}

export default Customer