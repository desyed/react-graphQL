import {Button, Empty, Form, Input, Menu, Modal, Select} from "antd";
import {
    PicRightOutlined, PlusOutlined
} from '@ant-design/icons';
import {CloudUploadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_USER, GET_USER, GET_USERS} from "../graphQl/queries/user.query";
import {CREATE_POST} from "../graphQl/mutations/post.mutation";
import {GET_POSTS} from "../graphQl/queries/post.query";
import {UPDATE_USER} from "../graphQl/mutations/user.mutation";

export default function UserList ({users, posts}) {
    const [form] = Form.useForm();
    const [selected, setSelectedKey] = useState(null);
    const {data:user, loading} = useQuery(FIND_USER, {
        variables: {
            status: "draft",
            where: {
                phone: {
                    eq: selected?.data?.phone
                }
            }
        }
    });
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [
            GET_USERS, // DocumentNode object parsed with gql
            // 'updatePost' // Query name
        ],
    });

    useEffect(() => {
        const usr = user?.users[0];
        form.setFieldsValue({
            first_name: usr?.data?.first_name,
            phone: usr?.data?.phone,
            body: usr?.data?.body,
        })
        console.log(user)
    }, [user])

    const onFinish = (values) => {
        console.log(values);
        updateUser({variables:{
                id: selected?.id,
                payload: {
                    phone: values?.phone,
                    body: values?.body,
                    first_name: values?.first_name
                }
            }}).then(res => {
                Modal.success({content: "User updated successfully"})
        }).catch(err=>{
            Modal.error({title: 'User update failed!',content: err.message})
        })
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
                    if (users && Array.isArray(users?.users)) {
                        users.users.forEach(itm => {
                            if (itm.id === key) {
                                setSelectedKey(itm);

                            }
                        })

                    }

                }}
            >
                {users && Array.isArray(users?.users) && users?.users.length > 0 ?
                    users?.users.map(item => (
                    <Menu.Item key={item.id} icon={<PicRightOutlined/>}>
                        {item?.data?.phone} {item?.data?.first_name && (' ('+item.data.first_name+')')}
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
                <Form.Item name="first_name" label="Name">
                    <Input/>
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input/>
                </Form.Item>
                <Form.Item name="body" label="Address">
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