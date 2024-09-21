import { Poll } from "@/core/setting";
import axios from "axios";
export const api_url = 'https://ezkpoll-backend.onrender.com/';
// axios.defaults.baseURL = api_url;
// export const fetchJson = async (url: string, options: object) => {
//     const response = await fetch(url, options);
//     console.log(response);
//     const body = await response.json();
//     if (!response.ok) {
//         const errorInfo = {
//             status_code: response.status,
//             detail: body.detail,
//         }
//         throw errorInfo;
//     }
//     if (body.fail)
//         throw body.fail;
//     return body;
// }

export const getPolls = async () => {
    const { data: response } = await axios.get(
        api_url + "polls");
    return response;
}
export const getPollById = async (id: number) => {
    const { data: response } = await axios.get(
        api_url + "poll/{id}?id=" + id);
    return response;
}

export const createPoll = async (pollData: Poll) => {
    const { data: response } = await axios.post(
        api_url + "create-poll", pollData)
    return response;
}

export const signUp = async (signUpData: any) => {
    const { data: response } = await axios.post(
        api_url + "sign-up", signUpData)
    return response;
}

export const poll = async (pollData: any) => {
    const { data: response } = await axios.post(
        api_url + "poll", pollData)
    return response;
}

