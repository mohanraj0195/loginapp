import '../styles/login-form.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onFinish = () => {
        props.setLoggedIn(true);
        props.setPageHeader('Home Page');
        navigate('/home');
    };

    const changeHeader = () => {
        props.setPageHeader('Password Reset Page');
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="showpassword" valuePropName="checked" noStyle>
                    <Checkbox onChange={(e) => setShowPassword(e.target.checked)}>Show Password</Checkbox>
                </Form.Item>

                <Link to='/forgotpwd' onClick={changeHeader}>
                    Forgot password
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;