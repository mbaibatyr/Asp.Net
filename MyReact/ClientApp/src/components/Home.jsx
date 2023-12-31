import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Tooltip, Modal, message, Popconfirm, notification, Select } from 'antd';
import { FileAddOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Label } from 'reactstrap';
const { Option } = Select;

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
              setTitleAdd(row.title);
              setYearAdd(row.year);
              BookGetById(row.id);
            }}
            style={{
              color: "green", marginLeft: 5
            }}>
          </EditOutlined>
        </>
      }
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '3%',
      render: (row) => {
        return <>
          <Popconfirm
            title="Are you sure to delete this book?"
            description={row.title + ' - ' + row.year}
            onConfirm={() =>
              confirm(row.id)
            }
            okText="Yes"
            cancelText="No"
          >
            <CloseOutlined
              style={{
                color: "red", marginLeft: 15
              }}>
            </CloseOutlined>
          </Popconfirm>
        </>
      }
    },
  ]
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');


  const [titleAdd, setTitleAdd] = useState('');
  const [yearAdd, setYearAdd] = useState('');

  const [authorDataAdd, setAuthorDataAdd] = useState([]);
  const [authorAdd, setAuthorAdd] = useState('');
  const handleChangeAuthorAdd = (value) => {
    setAuthorAdd(value);
  };

  const [catDataAdd, setCatDataAdd] = useState([]);
  const [catAdd, setCatAdd] = useState('');
  const handleChangeCatAdd = (value) => {
    setCatAdd(value);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [rowId, setRowId] = useState('');

  function confirm(id) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://localhost:5064/Book/BookDelete/${id}`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        message.success(data.result);
        fetchData();
      })

  };

  const BookAddOrEdit = () => {
    if (titleAdd == '' || titleAdd == null) {
      notification.error({
        message: "Info",
        description: (
          <>
            Title is empty
          </>
        )
      });
      return;
    }
    else if (yearAdd == '' || yearAdd == null) {
      notification.error({
        message: "Info",
        description: (
          <>
            Year is empty
          </>
        )
      });
      return;
    }


    var id = 0;
    if (mode == 'edit') {
      id = rowId;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id.toString(), title: titleAdd, author_id: authorAdd, year: yearAdd, category_id: catAdd })
    };
    fetch(`http://localhost:5064/Book/BookAddOrEdit`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.status == '1') {
          notification.info({
            message: "Info",
            description: (
              <>
                {data.result}
              </>
            )
          });
          if (data.result == 'ok') {
            setIsModalOpen(false);
            fetchData();
          }
        }
        else {
          notification.error({
            message: "Error",
            description: (
              <>
                {data.result}
                {data.error}
              </>
            )
          });
        }
      })
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

  const FillLists = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://localhost:5064/Book/AuthorSelect`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAuthorDataAdd(data);
      })


    fetch(`http://localhost:5064/Book/CategorySelect`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCatDataAdd(data);
      })
  }

  const BookGetById = (id) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://localhost:5064/Book/BookGetById/${id}`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCatAdd(data.category_id);
        setAuthorAdd(data.author_id);
      })
  }

  useEffect(() => {
    FillLists();
  }, []);

  return (
    <div>
      <Modal title={mode}
        open={isModalOpen}
        onOk={() => {
          BookAddOrEdit();
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
            <Label>Год</Label>
            <Input
              placeholder="Год издания"
              value={yearAdd}
              onChange={(e) => setYearAdd(e.target.value)}
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
                width: 300, marginLeft: 23
              }}
              showSearch
              status="success"
              value={authorAdd}
              optionFilterProp="children"
              onChange={handleChangeAuthorAdd}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {authorDataAdd.map((z) => (
                <Option key={z.id}>{z.name}</Option>
              ))}
            </Select>

          </Space>

          <Space
            direction='horizontal'
          >
            <Label>Категория</Label>
            <Select
              style={{
                width: 300, marginLeft: 23
              }}
              showSearch
              status="success"
              value={catAdd}
              optionFilterProp="children"
              onChange={handleChangeCatAdd}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {catDataAdd.map((z) => (
                <Option key={z.id}>{z.name}</Option>
              ))}
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
              setTitleAdd('');
              setYearAdd('');
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
