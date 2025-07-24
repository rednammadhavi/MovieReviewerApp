import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../apis/apiRequests';
import { setLoading } from '../redux/loadersSlice';
import { antValidatioError } from '../utils/helpers';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await LoginUser(values);
      dispatch(setLoading(false));
      localStorage.setItem('token', response.token);
      message.success(response.message);
      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-sans'>

      {/* Left Panel */}
      <div className='flex flex-col items-center justify-center p-10 animate-fade-in'>
        <h1 className='text-5xl font-black text-orange-400 mb-4 drop-shadow-2xl'>
          🎬 Movie World
        </h1>
        <p className='text-lg text-gray-200 max-w-md text-center leading-relaxed'>
          Dive into reviews, ratings, and recommendations curated just for you.
        </p>
      </div>

      {/* Right Panel */}
      <div className='flex items-center justify-center p-6'>
        <div className='w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 animate-slide-in'>
          <h2 className='text-3xl font-bold text-center mb-6 text-orange-300 tracking-wide'>
            Welcome Back
          </h2>

          <Form layout='vertical' onFinish={onSubmit} className='space-y-4'>
            <Form.Item
              label={<span className='text-white font-medium'>Email</span>}
              name='email'
              rules={antValidatioError}
            >
              <Input
                size='large'
                type='email'
                prefix={<MailOutlined className='text-gray-400' />}
                placeholder='you@example.com'
                className='bg-gray-300 placeholder-gray-400 text-black border border-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-500'
              />
            </Form.Item>

            <Form.Item
              label={<span className='text-white font-medium'>Password</span>}
              name='password'
              rules={antValidatioError}
            >
              <Input.Password
                size='large'
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='••••••••'
                className='bg-gray-300 placeholder-gray-400 text-black border border-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-500'
              />
            </Form.Item>

            <div className='space-y-3'>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                className='bg-orange-500 hover:bg-orange-600 border-none text-white font-semibold rounded-xl shadow-md transition duration-200'
              >
                Login
              </Button>

              <p className='text-center text-sm text-gray-100'>
                Don’t have an account?{' '}
                <Link to='/register' className='text-orange-400 underline hover:text-orange-500 transition'>
                  Register here
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
