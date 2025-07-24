import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../redux/loadersSlice";
import { DeleteMovie, GetAllMovies } from "../apis/apiRequests";
import { getDateFormat } from "../utils/helpers";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllMovies();
      dispatch(setLoading(false));
      setMovies(response.movies);
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const deleteMovie = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await DeleteMovie(id);
      message.success(response.message);
      await getAllMovies();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const columns = [
    {
      title: <span className="text-white">Poster</span>,
      dataIndex: "name",
      render: (text, record) => {
        const imageUrl = record?.posters?.[0] || "";
        return <img className="w-20 h-20 object-cover rounded shadow-md" src={imageUrl} alt={record.name} />;
      },
    },
    {
      title: <span className="text-white">Name</span>,
      dataIndex: "name",
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Release Date</span>,
      dataIndex: "releaseDate",
      render: (text) => <span className="text-white">{getDateFormat(text)}</span>,
    },
    {
      title: <span className="text-white">Genre</span>,
      dataIndex: "genre",
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Language</span>,
      dataIndex: "language",
      render: (text) => <span className="capitalize text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Action</span>,
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-4">
            {/* Edit Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-orange-400 hover:text-orange-500 cursor-pointer transition"
              onClick={() => navigate(`/admin/movies/edit/${record._id}`)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>

            {/* Delete Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-400 hover:text-red-500 cursor-pointer transition"
              onClick={() => deleteMovie(record._id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-400">🎬 Manage Movies</h2>
        <Button
          onClick={() => navigate("/admin/movies/add")}
          className="bg-orange-500 hover:bg-orange-600 border-none text-white font-semibold rounded-md px-6 py-2"
        >
          Add Movie
        </Button>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-xl">
        <Table
          dataSource={movies}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          className="custom-table"
        />
      </div>
    </div>
  );
}

export default Movies;
