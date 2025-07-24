import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rate, message, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/loadersSlice';
import { GetMovieById } from '../apis/apiRequests';

const MovieInfo = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const dispatch = useDispatch();

    const fetchMovie = async () => {
        try {
            dispatch(setLoading(true));
            const response = await GetMovieById(id);
            setMovie(response.movie);
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            message.error('Failed to load movie');
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
            {movie && (
                <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <img
                            src={movie?.posters[0]}
                            alt={movie?.name}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold text-orange-400">{movie?.name}</h1>

                            <div className="flex gap-3 items-center">
                                <Rate disabled allowHalf defaultValue={movie?.rating || 0} className="text-yellow-400" />
                                <span className="text-sm text-gray-300">({movie?.rating?.toFixed(1) || 0})</span>
                            </div>

                            <div className="text-gray-300">
                                <p><strong>Genre:</strong> {movie?.genre}</p>
                                <p><strong>Language:</strong> {movie?.language}</p>
                                <p><strong>Release Date:</strong> {new Date(movie?.releaseDate).toDateString()}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie?.tags?.map((tag, index) => (
                                    <Tag key={index} color="geekblue">{tag}</Tag>
                                ))}
                            </div>

                            <p className="text-gray-200 text-sm">{movie?.description || 'No description available.'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieInfo;
