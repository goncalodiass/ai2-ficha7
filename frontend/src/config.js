const API_BASE_URL = "http://localhost:3000";

const API_URLS = {
    FILMES: {
        LIST: `${API_BASE_URL}/filmes/list`,
        GET: (id) => `${API_BASE_URL}/filmes/get/${id}`,
        CREATE: `${API_BASE_URL}/filmes/create`,
        UPDATE: (id) => `${API_BASE_URL}/filmes/update/${id}`,
        DELETE: `${API_BASE_URL}/filmes/delete`,
    },
    GENEROS: {
        LIST: `${API_BASE_URL}/genero/list`,
        GET: (id) => `${API_BASE_URL}/genero/get/${id}`,
        CREATE: `${API_BASE_URL}/genero/create`,
        UPDATE: (id) => `${API_BASE_URL}/genero/update/${id}`,
        DELETE: `${API_BASE_URL}/genero/delete`,
    },
};

export default API_URLS;