import { CalendarOutlined, DeleteOutlined, EyeOutlined,  WalletOutlined, SearchOutlined } from '@ant-design/icons'
import Header from 'admin/components/Header'
import SideMenu from 'admin/components/SideMenu'
import { Typography, Table, Button, Input, DatePicker, Space, Popover } from 'antd'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Highlighter from 'react-highlight-words'

const { RangePicker } = DatePicker;


const Product = () => {
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
            type="link"
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
      title: 'Mã đơn hàng',
      dataIndex: 'code',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
    },
    {
      title: 
      <Space wrap>
        <Popover content={
          <Space direction="vertical" size={12}>
          <DatePicker
            presets={[
              {
                label: 'Yesterday',
                value: dayjs().add(-1, 'd'),
              },
              {
                label: 'Last Week',
                value: dayjs().add(-7, 'd'),
              },
              {
                label: 'Last Month',
                value: dayjs().add(-1, 'month'),
              },
            ]}
            onChange={onChange}
          />
          <RangePicker presets={rangePresets} onChange={onRangeChange} />
        </Space>
        } trigger="hover">
          <Button style={{ border: 'none', fontWeight: 600}}>Ngày tạo <CalendarOutlined /></Button>
        </Popover> 
      </Space>
      ,
      dataIndex: 'created',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        {
          text: 'Đang giao',
          value: 'shipping',
        },
        {
          text: 'Đã giao',
          value: 'delivered',
        },
        {
          text: 'Đã hủy',
          value: 'cancelled'
        },
        {
          text: 'Đang chờ duyệt',
          value: 'waiting'
        }
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Xử lí đơn',
      dataIndex: 'handle',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      
    },
  ];
  const data = [
    {
      key: '1',
      code: 'SFIHAHCJ',
      name: 'Akaga',
      phone: '0987654321',
      total: 10000000,
      created: '2020-01-01',
      status: 'Đang giao hàng',
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" ><Link to={`/admin/product/update/1`}><EyeOutlined /> Xem</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'purple'}}> Lưu đơn</Button>
      </div>,
    },
    {
      key: '2',
      code: 'UHQagHOFH',
      name: 'Akaga',
      phone: '0989783712',
      total: 10000000,
      created: '2020-01-05',
      status: 'Đã giao',
      handle: <div style={{ display: 'flex'}}></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" ><Link to={`/admin/product/update/1`}><EyeOutlined /> Xem</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'purple'}}> Lưu đơn</Button>
      </div>,
    },
    {
      key: '3',
      code: 'HaiwuWGdg',
      name: 'Akaga',
      phone: '0987879378',
      total: 10000000,
      created: '2020-07-05',
      status: 'Nhân viên đã hủy',
      handle: <div style={{ display: 'flex'}}></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" ><Link to={`/admin/product/update/1`}><EyeOutlined /> Xem</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'purple'}}> Lưu đơn</Button>
      </div>,
    },
    {
      key: '4',
      code: 'Ialfawbgas',
      name: 'Akaga',
      phone: '0989783712',
      total: 10000000,
      created: '2020-01-09',
      status: 'Đang chờ duyệt',
      handle: <div style={{ display: 'flex'}}>
        <Button>Duyệt đơn</Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}>Hủy đơn</Button>
      </div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" ><Link to={`/admin/product/update/1`}><EyeOutlined /> Xem</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'purple'}}> Lưu đơn</Button>
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
  
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <>
      <div style={{ display: 'flex', overflowY: 'scroll'}}>
        <SideMenu />
        <div style={{ overflowY: 'scroll', backgroundColor: '#e6e6e6'}}>
          <Header style={{ width: '100%'}} />
          <Space style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography.Title level={3} style={{ padding: '10px' }}><WalletOutlined /> Danh Sách Đơn Hàng </Typography.Title>
            <Button type="primary"><DeleteOutlined /> Đơn đã lưu</Button>
          </Space>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            onChange={onFilterStatus}
          />
        </div>
      </div>
    </>
  )
}

export default Product