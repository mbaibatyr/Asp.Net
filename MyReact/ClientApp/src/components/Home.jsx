import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input } from 'antd';

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
  }
]

const Home = () => {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');

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
