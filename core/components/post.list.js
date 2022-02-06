import {Button, Empty, Form, Input, Menu, Modal, Select, Spin} from "antd";
import {
    CloudUploadOutlined,
    PicRightOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_POST, GET_POSTS} from "../graphQl/queries/post.query";
import {UPDATE_COMMENT} from "../graphQl/mutations/comment.mutation";
import {UPDATE_POST} from "../graphQl/mutations/post.mutation";

export default function PostList ({posts, comments}) {
    const [form] = Form.useForm();
    const [selected, setSelectedKey] = useState(null);


    const {data:post, loading} = useQuery(GET_POST, {
        variables: { id: selected }
    });

    useEffect(() => {
        const comments = post?.post?.comments?.length > 0 && post?.post?.comments.map(i=>i.id);
        form.setFieldsValue({
            title:post?.post?.data?.title,
            body:post?.post?.data?.body?.text,
            comments
        })
        console.log(post?.post)
    }, [post])

    const [updatePost] = useMutation(UPDATE_POST,
        {
            update(cache, { data: { updatePost } }) {
                const {posts}  = cache.readQuery({ query: GET_POSTS });
                console.log('-------', posts)
                cache.writeQuery({
                    query: GET_POSTS,
                    data: {posts}
                });
            },
            refetchQueries: [
                GET_POSTS, // DocumentNode object parsed with gql
                // 'updatePost' // Query name
            ],
        }
    );

    const onFinish = (values) => {
        // payload> title,body
        // connect > comment_ids []
        console.log(values);
        updatePost({variables:{
                id: selected,
                payload: {
                    title: values.title,
                    body: {html: values.body}
                },
                connect: {comment_ids: values.comments}
            }}).then(res => {
                Modal.success({content: 'Post updated successfully'})
        }).catch(err=>{
            Modal.error({title: 'Post Update failed!'})
        })
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
                {posts && Array.isArray(posts?.posts) && posts?.posts.length > 0 ?
                    posts.posts.map(item => (
                        <Menu.Item key={item.id} icon={<PicRightOutlined/>}>
                            {item?.data?.title}
                        </Menu.Item>
                    )): <Empty imageStyle={{marginTop: 30}}  description={'Nothing Found!'} />}

            </Menu>
        </div>

        <div className="col third" style={{padding: 15}}>
            <Spin  spinning={loading}>
            {!selected && <div style={{textAlign: 'center'}}>
                <Empty imageStyle={{marginTop: 30}} description={false}/>
                <Button icon={<PlusOutlined />} type="primary" size="small" htmlType="submit">
                    Add New Post
                </Button>
            </div>}
            {selected && <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>
                        Update Post
                    </h3>
                    <Button icon={<CloudUploadOutlined/>} type="default" htmlType="submit">
                        Update
                    </Button>
                </div>
                <Form.Item name="title" label="Title">
                    <Input/>
                </Form.Item>
                <Form.Item name="body" label="Body">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item name="comments" label="Comments">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        // onChange={handleChange}
                    >
                        {comments?.comments && comments.comments.map(c => <Select.Option
                            key={c.id}>{c?.data?.body}</Select.Option>)}
                    </Select>
                </Form.Item>

            </Form>}
            </Spin>
        </div>

    </>
}