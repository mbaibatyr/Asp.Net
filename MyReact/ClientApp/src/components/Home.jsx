import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Tooltip, Modal, message, notification, Select } from 'antd';
import { FileAddOutlined, EditOutlined } from '@ant-design/icons';
import { Label } from 'reactstrap';

const Home = () => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'fio',
      dataIndex: 'fio',
      key: 'fio'
    },
    {
      title: 'category_name',
      dataIndex: 'category_name',
      key: 'category_name'
    },
    {
      title: 'Edit',
      key: 'edit',
      width: '3%',
      render: (row) => {
        return <>
          <EditOutlined
            onClick={(e) => {
              e.preventDefault();
              setMode('edit');
              setRowId(row.id);
              setIsModalOpen(true);

              notification.info({
                message: "Info",
                description: (row.id)
              });

            }}
            style={{
              color: "green", marginLeft: 5
            }}>
          </EditOutlined>
        </>
      }
    },
  ]
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');

  const [titleAdd, setTitleAdd] = useState('');



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [rowId, setRowId] = useState('');
  const BookAddOrEdit = () => {

  }

  const fetchData = () => {
    var titleTemp;
    if (title == '')
      titleTemp = 'all';
    else
      titleTemp = title;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://localhost:5064/Book/BookGetAll/${titleTemp}`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data);
      })
  }

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <div>
      <Modal title={mode}
        open={isModalOpen}
        onOk={() => {
          BookAddOrEdit();
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}>
        <Space
          direction='vertical'
        >
          <Space
            direction='horizontal'
          >
            <Label>Название</Label>
            <Input
              placeholder="Название книги"
              value={titleAdd}
              onChange={(e) => setTitleAdd(e.target.value)}
              style={{
                width: 300
              }}
            />
          </Space>

          <Space
            direction='horizontal'
          >
            <Label>Автор</Label>
            <Select
              style={{
                width: 150,
              }}
              showSearch
              status="success"
              //value={epicAdd}
              optionFilterProp="children"
              //onChange={handleChangeEpicAdd}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {/* {epicDataAdd.map((z) => (
                <Option key={z.value}>{z.text}</Option>
              ))} */}
            </Select>

          </Space>


        </Space>

      </Modal>
      <Space
        direction='horizontal'
      >
        <Input
          placeholder="Название книги"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: 300, backgroundColor: 'yellow', color: 'green', fontWeight: 'bold'
          }}
        />

        <Button
          onClick={() => {
            fetchData();
          }}
        >
          Найти
        </Button>

        <Tooltip
          title="Добавление новой книги"
          color='red'
        >
          <Button
            icon={<FileAddOutlined />}
            onClick={() => {
              setMode('add');
              setIsModalOpen(true);
            }}
            style={{
              color: 'green'
            }}
          >
          </Button>
        </Tooltip>
      </Space>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          position: ["topRight"],
          showSizeChanger: true,
          defaultPageSize: 15,
          pageSizeOptions: ["15", "30", "50", "100", "200"]
        }}
        // pagination={false}
        size='small'

      />
    </div>
  )
}

export default Home;
