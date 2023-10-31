// import React, { Component } from 'react';
import React, { useState } from 'react';

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
        console.log(data);
        //setData(data);
      })
  }

  return (
    <div>
      here crud
    </div>
  )
}

export default Home;
