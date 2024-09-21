import { atom } from "recoil";
import { Account } from "thirdweb/wallets";
import { Poll } from "@/core/setting";

export const addressAtom = atom<Account>({
    key: 'address',
    default: undefined as any,
});

export const selectedPollAtom = atom<Poll>({
    key: "selected_poll",
    default: ({
        "id": 1,
        "name": "baddd Taipei",
        "description": "ETHTaipei 2024 is a community of blockchain enthusiasts in Taipei, Taiwan. We are a group of developers, designers, and entrepreneurs who are passionate about blockchain technology and its potential to change the world. We host regular meetups, workshops, and hackathons to help grow the blockchain community in Taipei.",
        "address": "",
        "blockNumber": "",
        "metadata": {
            "endTime": 1711111960152,
            "startTime": 1711025560152,
            "estimatedTime": 86400000,
            "isAb": false
        },
        "createdAt": "2024-03-21T13:00:22.314Z",
        "updatedAt": "2024-03-21T13:00:22.314Z",
        "questions": [{
            "id": 1,
            "qname": "purpose",
            "qdesc": "What is the purpose of ETHTaipei 2024?",
            "pollInfoId": 1,
            "createdAt": "2024-03-21T13:00:22.510Z",
            "options": [
                {
                    "id": 1,
                    "oname": "girls",
                    "odesc": "girlshahahahahaha",
                    "oimg": "https://i.seadn.io/gae/MMVtJ_g7BfPxhOMEIxhwwvXsDhZCmEhAxrrRGIAVYf8MHuJC8GbSAT8iXd4mkr8bEU67g0eV4kMg_hQRAM0whPTdW6vufqPR_ihRuWA?auto=format&dpr=1&w=1000",
                    "pollQuestionId": 1,
                    "createdAt": "2024-03-21T13:00:22.687Z"
                },
                {
                    "id": 2,
                    "oname": "Vitalik",
                    "odesc": "Vitalik good awesome hahahahaha",
                    "oimg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/440px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
                    "pollQuestionId": 1,
                    "createdAt": "2024-03-21T13:00:22.857Z"
                }
            ]
        }]
    })
})

/**
 * @const
 */
export const templateABTestAtom = atom<Poll>({
    key: "template_poll",
    default: ({
        "id": -1,
        "name": "",
        "description": "",
        "address": "",
        "blockNumber": "",
        "metadata": {
            "endTime": 0,
            "startTime": 0,
            "estimatedTime": 86400000,
            "isAb": true
        },
        "createdAt": "",
        "updatedAt": "",
        "questions": [{
            "id": 1,
            "qname": "purpose",
            "qdesc": "What is the purpose of ETHTaipei 2024?",
            "pollInfoId": 1,
            "createdAt": "2024-03-21T13:00:22.510Z",
            "options": [
                {
                    "id": 1,
                    "oname": "",
                    "odesc": "",
                    "oimg": "https://i.seadn.io/gae/MMVtJ_g7BfPxhOMEIxhwwvXsDhZCmEhAxrrRGIAVYf8MHuJC8GbSAT8iXd4mkr8bEU67g0eV4kMg_hQRAM0whPTdW6vufqPR_ihRuWA?auto=format&dpr=1&w=1000",
                    "pollQuestionId": 1,
                    "createdAt": ""
                },
                {
                    "id": 2,
                    "oname": "",
                    "odesc": "",
                    "oimg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/440px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
                    "pollQuestionId": 1,
                    "createdAt": ""
                }
            ]
        }]
    })
})

export const publicKeyAtom =atom<string>({
    key: "P_KEY",
    default: ""
})

export const sercetKeyAtom =atom<string>({
    key: "SECRET_KEY",
    default: ""
})