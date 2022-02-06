import {Button, Empty, Form, Input, Menu, Modal, Select, Spin} from "antd";
import {
    CloudUploadOutlined,
    PicRightOutlined, PlusOutlined
} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_COMMENT, GET_COMMENTS} from "../graphQl/queries/comment.query";
import {UPDATE_COMMENT} from "../graphQl/mutations/comment.mutation";
import {GET_POSTS} from "../graphQl/queries/post.query";

export default function CommentList ({comments, posts}) {
    const [form] = Form.useForm();
    const [selected, setSelectedKey] = useState(null);
    const {data:comment, loading} = useQuery(GET_COMMENT, {
        variables: { id: selected }
    });
    const [updateComment, {data, loading:updateLoading}] = useMutation(UPDATE_COMMENT,{
        refetchQueries: [
            GET_COMMENTS, // DocumentNode object parsed with gql
            // 'updatePost' // Query name
        ],})
    useEffect(() => {
        form.setFieldsValue({
            body:comment?.comment?.data?.body,
            post: comment?.comment?.post?.id
        })
    }, [comment])
    const onFinish = (values) => {
        //connect > post_id
        //payload > body
        console.log(values);
        updateComment({variables: {
                id: selected,
                payload: {body: values.body},
                connect: {post_id: values.post}
            }}).then(res => {
            Modal.success({
                content: 'Successfully updated.',
            });
        }).catch(err => {
            Modal.error({
                title: 'Update failed!'
            })
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
                {comments && Array.isArray(comments?.comments) && comments?.comments.length > 0 ?
                    comments?.comments.map(item => (
                        <Menu.Item key={item.id} icon={<PicRightOutlined/>}>
                            {item?.data?.body}
                        </Menu.Item>
                    )): <Empty imageStyle={{marginTop: 30}}  description={'Nothing Found!'} />}

            </Menu>
        </div>
        <div className="col third" style={{padding: 15}}>
        <Spin spinning={loading}>
            {!selected && <div style={{textAlign: 'center'}}>
                <Empty imageStyle={{marginTop: 30}} description={false}/>
                <Button icon={<PlusOutlined />} type="primary" size="small" htmlType="submit">
                    Add New Comment
                </Button>
            </div>}
            {selected && <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>
                        Update Comment
                    </h3>
                    <Button  icon={<CloudUploadOutlined/>} type="default" htmlType="submit">
                        update
                    </Button>
                </div>
                <Form.Item name="body" label="Body">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item name="post" label="Post">
                    <Select
                        // mode="multiple"
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

        </Spin>
        </div>
    </>
}