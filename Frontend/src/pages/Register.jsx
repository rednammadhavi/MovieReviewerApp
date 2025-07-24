import { Button, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../apis/apiRequests';
import { useNavigate } from 'react-router-dom';
import { antValidatioError } from '../utils/helpers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/loadersSlice';

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
    <>
      <div className='grid grid-cols-2 h-screen'>
        <div className='bg-primary flex flex-col items-center justify-center'>
          <div>
            <h1 className='text-6xl text-orange-500 font-semibold'>
              Welcome to Movie World
            </h1>
            <span className='text-xl text-gray-400 mt-2'>
              One stop for all your movie review,ratings and recommendations.
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-1/2'>
            <h1 className='text-2xl'>Register in to acoount</h1>
            <hr />
            <Form
              layout='vertical'
              className='flex flex-col gap-5'
              onFinish={onSubmit}
            >
              <Form.Item label='Name' name='name' rules={antValidatioError}>
                <input />
              </Form.Item>
              <Form.Item label='Email' name='email' rules={antValidatioError}>
                <input />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={antValidatioError}
              >
                <input />
              </Form.Item>
              <div className='flex flex-col gap-5'>
                <Button type='primary' htmlType='submit' block>
                  Register
                </Button>
                <Link to='/login'>Already have an account ? Login here</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
