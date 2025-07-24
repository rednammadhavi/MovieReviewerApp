import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function Profile() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f97316&color=fff`}
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-md border-4 border-orange-400"
          />

          {/* Name */}
          <h2 className="text-3xl font-bold text-orange-400">{user?.name}</h2>

          {/* Email */}
          <p className="text-gray-300 text-sm">{user?.email}</p>

          {/* Role or Additional Info */}
          <p className="text-gray-400 text-sm">
            Role: <span className="capitalize text-white">{user?.role || 'user'}</span>
          </p>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => navigate('/')}
              className="bg-orange-500 hover:bg-orange-600 border-none text-white font-semibold rounded-md px-6 py-1"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => message.info('Edit Profile coming soon!')}
              className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-md px-6 py-1"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
