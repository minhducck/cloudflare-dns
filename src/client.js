import axios from "axios";

export function createClient(config)
{
    function getBearerToken() {
        return config['ACCESS_KEY'] ? `Bearer ${config['ACCESS_KEY']}` : '';
    }

    return axios.create({
        baseURL: config.baseURL,
        headers: {
            Authorization: getBearerToken(),
            "Content-Type": "application/json",
        },
        timeout: 3000,
    })
}