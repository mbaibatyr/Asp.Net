import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Tooltip, Modal, message, notification, Select } from 'antd';
import { FileAddOutlined, EditOutlined } from '@ant-design/icons';
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
            Status is empty
          </>
        )
      });
      return;
    }
    setIsModalOpen(false);

    // var id = 0;
    // var rowExecIdTemp = '';
    // if (mode == 'edit') {
    //   id = rowId;
    //   rowExecIdTemp = rowExecId
    // }
    // else
    //   rowExecIdTemp = v_executor.current

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ Id: id.toString(), sprint_id: sprint, epic_id: epicAdd, executor_id: rowExecIdTemp, point_id: pointsAdd, cost_avoidance: costAvAdd == '' ? '0' : costAvAdd, status_id: statusAdd, approval: approvalAdd == true ? '1' : '0', process: processAdd, mode: mode2 })
    // };
    // fetch(`Sprint/AddOrEditSprintData`, requestOptions)
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     if (data.status = '1') {
    //       notification.info({
    //         message: "Info",
    //         description: (
    //           <>
    //             {data.result}
    //           </>
    //         )
    //       });
    //       if (data.result == 'ok') {
    //         setIsModalVisible(false);
    //         fetchData();
    //       }
    //     }
    //     else {
    //       notification.error({
    //         message: "Error",
    //         description: (
    //           <>
    //             {data.result}
    //             {data.error}
    //           </>
    //         )
    //       });
    //     }
    //   })
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
