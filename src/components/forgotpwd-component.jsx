import '../styles/login-form.css';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const onFinish = () => {
        props.setPageHeader('Login Page');
        navigate('/');
    };

    return (
        <Form
            name="forgot_password"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="Mail Id"
                rules={[
                    {
                        type: 'email'
                    },
                    {
                        required: true,
                        message: 'Please input your mailid!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Enter Your Mail Id" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Confirm
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ForgotPassword;