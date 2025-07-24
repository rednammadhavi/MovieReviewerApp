import axios from "axios";
import {
    UserRoutes,
    MovieRoutes,
    ArtistRoutes,
    ImageRoutes
} from "./apiRoutes";

// Core API Request Handler
const ApiRequest = async ({ method, endPoint, payload, queryString }) => {
    try {
        const response = await axios({
            method,
            url: endPoint,
            data: payload,
            params: queryString,
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || error.message || "Something went wrong"
        );
    }
};

// User Requests
export const RegisterUser = (data) =>
    ApiRequest({ method: "POST", endPoint: UserRoutes.REGISTER, payload: data });

export const LoginUser = (data) =>
    ApiRequest({ method: "POST", endPoint: UserRoutes.LOGIN, payload: data });

export const GetCurrentUser = () =>
    ApiRequest({ method: "GET", endPoint: UserRoutes.CURRENT });

// Movie Requests
export const AddMovie = (data) =>
    ApiRequest({ method: "POST", endPoint: MovieRoutes.ADD, payload: data });

export const GetAllMovies = () =>
    ApiRequest({ method: "GET", endPoint: MovieRoutes.GET_ALL });

export const GetMovieById = (id) =>
    ApiRequest({ method: "GET", endPoint: MovieRoutes.GET_BY_ID(id) });

export const UpdateMovie = (id, data) =>
    ApiRequest({ method: "PUT", endPoint: MovieRoutes.UPDATE(id), payload: data });

export const DeleteMovie = (id) =>
    ApiRequest({ method: "DELETE", endPoint: MovieRoutes.DELETE(id) });

// Artist Requests
export const AddArtist = (data) =>
    ApiRequest({ method: "POST", endPoint: ArtistRoutes.ADD, payload: data });

export const GetAllArtists = () =>
    ApiRequest({ method: "GET", endPoint: ArtistRoutes.GET_ALL });

export const GetArtistById = (id) =>
    ApiRequest({ method: "GET", endPoint: ArtistRoutes.GET_BY_ID(id) });

export const UpdateArtist = (id, data) =>
    ApiRequest({ method: "PUT", endPoint: ArtistRoutes.UPDATE(id), payload: data });

export const DeleteArtist = (id) =>
    ApiRequest({ method: "DELETE", endPoint: ArtistRoutes.DELETE(id) });

// Image Upload
export const UploadImage = (formData) =>
    ApiRequest({ method: "POST", endPoint: ImageRoutes.UPLOAD, payload: formData });
