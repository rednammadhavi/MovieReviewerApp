import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/loadersSlice';
import { GetCurrentUser } from '../apis/apiRequests';

function Users() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetCurrentUser();
      setUser(response.data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: <span className="text-white">Name</span>,
      dataIndex: 'name',
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Email</span>,
      dataIndex: 'email',
      render: (text) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: <span className="text-white">Role</span>,
      dataIndex: 'role',
      render: (text) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${text === 'admin'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-green-500/20 text-green-400'
            }`}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <h2 className="text-3xl font-bold mb-6 text-orange-400">👤 Current User</h2>

      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-xl">
        <Table
          dataSource={user ? [user] : []}
          columns={columns}
          rowKey="_id"
          pagination={false}
          className="custom-table"
        />
      </div>
    </div>
  );
}

export default Users;
