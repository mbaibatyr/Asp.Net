import React, { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';

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

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`http://localhost:5064/Book/BookGetAll/all`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      here crud
      <Table
        dataSource={data}
        columns={columns}
        // pagination={{
        //   position: ["topRight"],
        //   showSizeChanger: true,
        //   defaultPageSize: 15,
        //   pageSizeOptions: ["15", "30", "50", "100", "200"]
        // }}
        pagination={false}
        size='small'

      />;
    </div>
  )
}

export default Home;
