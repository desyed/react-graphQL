import {useMutation} from "@apollo/client";
import {USER_REGISTER} from "../core/graphQl/mutations/user.mutation";
import {Form, Input, Button, Checkbox, Modal} from 'antd';
import {useState} from "react";
import {useRouter} from "next/router";
import Dashboard from "../core/layouts/dashboard";

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
            Modal.success({content: 'Registration Successful'})
        }).catch(error => {
            console.log(error)
            Modal.error({title:'Registration failed!'})
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [userRegister] = useMutation(USER_REGISTER, {
        variables: {
            ...formValues
        }
    });

    return (<Dashboard>
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h3>User Registration</h3>
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
                    <Input  style={{width: 300}} />
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
                    <Input.Password style={{width: 300}}  />
                </Form.Item>

                <Form.Item style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </Dashboard>
    );
};

 export default Registration;