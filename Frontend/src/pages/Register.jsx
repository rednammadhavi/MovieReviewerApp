import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../apis/apiRequests';
import { setLoading } from '../redux/loadersSlice';
import { antValidatioError } from '../utils/helpers';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await RegisterUser(values);
      dispatch(setLoading(false));
      message.success(response.message);
      navigate('/login');
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
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white'>
      {/* Left Section */}
      <div className='flex items-center justify-center p-8'>
        <div className='text-center space-y-6'>
          <h1 className='text-4xl md:text-6xl font-extrabold text-orange-400 drop-shadow-lg animate-fade-in'>
            🎬 Movie World
          </h1>
          <p className='text-lg md:text-xl text-gray-300 leading-relaxed'>
            Your one-stop destination for authentic reviews, ratings, and recommendations.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className='flex items-center justify-center p-6'>
        <div className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 text-white animate-slide-in'>
          <h2 className='text-3xl font-semibold text-center mb-4'>
            Create Your Account
          </h2>
          <Form layout='vertical' className='space-y-5' onFinish={onSubmit}>
            <Form.Item label={<span className='text-white'>Name</span>} name='name' rules={antValidatioError}>
              <Input size='large' placeholder='John Doe' className='bg-white/10 border border-gray-400 text-white' />
            </Form.Item>
            <Form.Item label={<span className='text-white'>Email</span>} name='email' rules={antValidatioError}>
              <Input type='email' size='large' placeholder='example@mail.com' className='bg-white/10 border border-gray-400 text-white' />
            </Form.Item>
            <Form.Item label={<span className='text-white'>Password</span>} name='password' rules={antValidatioError}>
              <Input.Password size='large' placeholder='••••••••' className='bg-white/10 border border-gray-400 text-white' />
            </Form.Item>
            <div className='space-y-3'>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                className='bg-orange-500 hover:bg-orange-600 border-none text-white font-semibold rounded-lg'
              >
                Register
              </Button>
              <p className='text-center text-sm text-gray-300'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-400 underline hover:text-blue-500'>
                  Login here
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
