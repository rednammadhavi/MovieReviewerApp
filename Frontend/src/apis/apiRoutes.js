const host = "/api";

export const UserRoutes = {
    REGISTER: `${host}/users/register`,
    LOGIN: `${host}/users/login`,
    CURRENT: `${host}/users/get-current-user`,
};

export const MovieRoutes = {
    ADD: `${host}/movies/add-movie`,
    GET_ALL: `${host}/movies`,
    GET_BY_ID: (id) => `${host}/movies/${id}`,
    UPDATE: (id) => `${host}/movies/${id}`,
    DELETE: (id) => `${host}/movies/${id}`,
};

export const ArtistRoutes = {
    ADD: `${host}/artists/add-artist`,
    GET_ALL: `${host}/artists`,
    GET_BY_ID: (id) => `${host}/artists/${id}`,
    UPDATE: (id) => `${host}/artists/${id}`,
    DELETE: (id) => `${host}/artists/${id}`,
};

export const ImageRoutes = {
    UPLOAD: `${host}/images/upload-image`,
};
