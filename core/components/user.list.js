import {Button, Empty, Form, Input, Menu, Select} from "antd";
import {
    PicRightOutlined, PlusOutlined
} from '@ant-design/icons';
import {CloudUploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import Link from "next/link";

export default function UserList ({users, posts}) {
    const [form] = Form.useForm();
    const [selected, setSelectedKey] = useState(null);
    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };
    return <>
        <div className="col second">
            <Menu
                style={{ width: '100%' }}
                mode="vertical"
                theme="light"
                onSelect={( {key} ) => {
                    console.log(key)
                    setSelectedKey(key)
                }}
            >
                {users && Array.isArray(users?.users) && users?.users.length > 0 ?
                    users?.users.map(item => (
                    <Menu.Item key={item.id} icon={<PicRightOutlined/>}>
                        {item?.data?.first_name}
                    </Menu.Item>
                )): <Empty imageStyle={{marginTop: 30}} description={'Nothing Found!'} />}

            </Menu>
        </div>
        <div className="col third" style={{padding: 15}}>
            {!selected && <div style={{textAlign: 'center'}}>
                <Empty imageStyle={{marginTop: 30}} description={false}/>
                <Button icon={<PlusOutlined />} type="primary" size="small" htmlType="button">
                    <Link href="/registration"><a>Register a User</a></Link>
                </Button>
            </div>}
            {selected && <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>
                        Update User
                    </h3>
                    <Button icon={<CloudUploadOutlined/>} type="default" htmlType="submit">
                        update
                    </Button>
                </div>
                <Form.Item name="name" label="Name">
                    <Input/>
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input/>
                </Form.Item>
                <Form.Item name="posts" label="Posts">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        // onChange={handleChange}
                    >
                        {posts?.posts && posts.posts.map(p => <Select.Option
                            key={p.id}>{p?.data?.title}</Select.Option>)}
                    </Select>
                </Form.Item>

            </Form>}

        </div>
    </>
}