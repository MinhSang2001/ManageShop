import { CalendarOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined, WalletOutlined } from '@ant-design/icons';
import Header from 'admin/components/Header';
import SideMenu from 'admin/components/SideMenu';
import { Button, Table, Typography, DatePicker, Space, Popover, Input } from 'antd';
import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;


const Category = () => {
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
      render: (index) => <p>{index+1}</p>,
    },
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'name',
      render: (render) => <p>{render}</p>,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'level',
    },
    {
      title: <Space wrap>
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
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        {
          text: 'Đang kinh doanh',
          value: 'selling',
        },
        {
          text: 'Ngưng kinh doanh',
          value: 'stopped',
        }
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Thao tác',
      dataIndex: 'action'
    }
  ];
  const data = [
    {
      key: '1',
      id: '1',
      name: 'Tivi (7)',
      level: '',
      created: '2020-01-01',
      status: <Button type='primary' value="small" style={{ backgroundColor: "green"}}><CheckOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '2',
      id: '',
      name: 'Tivi LCD (3)',
      level: '1',
      created: '2020-01-04',
      status: <Button type='primary' value="small" style={{ backgroundColor: "green"}}><CheckOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '3',
      id: '',
      name: 'Tivi Google (4)',
      level: '1',
      created: '2020-01-05',
      status: <Button type='primary' value="small" style={{ backgroundColor: "green"}}><CheckOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '4',
      id: '',
      name: 'Máy tính (10)',
      level: '',
      created: '2020-02-01',
      status: <Button type='primary' value="small" style={{ backgroundColor: "red"}}><CloseOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '5',
      id: '',
      name: 'Chuột (2)',
      level: '1',
      created: '2020-03-01',
      status: <Button type='primary' value="small" style={{ backgroundColor: "green"}}><CheckOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '6',
      id: '',
      name: 'Bàn phím (3)',
      level: '1',
      created: '2020-01-04',
      status: <Button type='primary' value="small" style={{ backgroundColor: "green"}}><CloseOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
      action: <div style={{ display: 'flex'}}>
        <Button type='primary' value="small" style={{ backgroundColor: 'yellow', color: 'black'}}><Link to={`/admin/product/update/1`}><EditOutlined /> Sửa</Link></Button>
        <Button type='primary' value="small" style={{ backgroundColor: 'red'}}><DeleteOutlined /> Xóa</Button>
      </div>,
    },
    {
      key: '7',
      id: '',
      name: 'Cây máy tính (5)',
      level: '1',
      created: '2020-01-06',
      status: <Button type='primary' value="small" style={{ backgroundColor: "red"}}><CloseOutlined /></Button>,
      handle: <div style={{ display: 'flex'}}><Button type='primary' value="small" style={{ backgroundColor: 'green'}}>Đang giao hàng</Button></div>,
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
          <Typography.Title level={3} style={{ padding: '10px' }}><WalletOutlined /> Danh Sách Loại Sản Phẩm</Typography.Title>
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

export default Category