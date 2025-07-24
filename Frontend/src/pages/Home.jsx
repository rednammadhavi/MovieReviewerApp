import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/loadersSlice';
import { Rate, message } from 'antd';
import { GetAllMovies } from '../apis/apiRequests';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const data = await GetAllMovies();
      setMovies(data.movies);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className='min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white'>
      <h1 className='text-4xl font-bold mb-8 text-center text-orange-400'>
        🎥 Trending Movies
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {movies.map((movie) => (
          <div
            key={movie._id}
            className='bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer border border-white/20'
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            <img
              src={movie?.posters[0] || ''}
              alt={movie?.name}
              className='h-56 w-full object-cover'
            />

            <div className='p-4 space-y-2'>
              <h2 className='text-xl font-semibold text-white truncate'>{movie.name}</h2>
              <hr className='border-gray-600' />

              <div className='flex justify-between text-sm text-gray-300'>
                <span className='font-medium'>Language</span>
                <span className='capitalize'>{movie.language}</span>
              </div>

              <div className='flex justify-between items-center text-sm text-gray-300'>
                <span className='font-medium'>Rating</span>
                <Rate
                  disabled
                  defaultValue={movie.rating || 0}
                  allowHalf
                  style={{ color: '#f97316', fontSize: '16px' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
