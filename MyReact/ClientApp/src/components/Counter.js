import React, { Component } from 'react';
import { Button, Space, Table } from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

export class Counter extends Component {


    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <div>
                <Space wrap>
                    <Button type="primary" danger
                        icon={<AppleOutlined />}
                    >
                        Primary
                    </Button>
                    <Button danger>Default</Button>
                    <Button type="dashed" danger>
                        Dashed
                    </Button>
                    <Button type="text" danger>
                        Text
                    </Button>
                    <Button type="link" danger>
                        Link
                    </Button>
                </Space>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        position: ["topRight"],
                        //showSizeChanger: true,
                        defaultPageSize: 15,
                        pageSizeOptions: ["15", "30", "50", "100", "200"]
                    }}

                />;

                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
            </div>
        );
    }
}
