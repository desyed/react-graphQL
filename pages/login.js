import {useMutation} from "@apollo/client";
import {USER_LOGIN, USER_REGISTER} from "../core/graphQl/mutations/user.mutation";
import { Form, Input, Button, Checkbox } from 'antd';
import {useState} from "react";
import {useRouter} from "next/router";

const Registration = () => {
    const [formValues, setFormValues] = useState({});
    const router = useRouter();
    const onFinish = (values) => {
        console.log('Success:', values);
        setFormValues(values);
        userRegister().then(res => {
            console.log(res.data.userRegister);
            localStorage.setItem('token', res?.data?.userRegister?.id_token)
            router.push('/');
        }).catch(error => {
            console.log(error)
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [userRegister] = useMutation(USER_LOGIN, {
        variables: {
            ...formValues
        }
    });

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Secret"
                name="secret"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Registration;