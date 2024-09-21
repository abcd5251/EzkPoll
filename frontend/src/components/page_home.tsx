import React, { useEffect, useRef, useState } from "react";
import { keccak256 } from "thirdweb";
import { ConnectButton, useConnect, useActiveWallet } from "thirdweb/react";
import { chainById } from "../utils/chains";
import { useRouter } from 'next/navigation';
import WelcomeBanner from "./welcome_banner";
import { getPollById, getPolls, signUp } from "@/utils/api";
import { metamaskWallet } from "thirdweb/wallets";
const metamaskConfig = metamaskWallet();
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addressAtom, publicKeyAtom, selectedPollAtom, sercetKeyAtom } from "@/state/state";
import { genKeyPair } from "@/utils/crypto";

interface PollInfo {
    // title: string;
    "id": number,
    "name": string,
    "description": string,
    "address": string,
    "blockNumber": string,
    "metadata": {
        "startTime": number,
        "endTime": number,
        "estimatedTime": number,
        "isAb": boolean
    },
    "createdAt": string,
    "updatedAt": string
}

export enum PollType {
    ongoing = "ongoing",
    completed = "completed"
}

const HomePage = () => {

    const [ongoingPolls, setOngoingPolls] = useState<any[]>([]);
    const [completedPolls, setCompletedPolls] = useState<any[]>([]);
    const address = useRecoilValue(addressAtom);
    const setAddress = useSetRecoilState(addressAtom);
    const [allPolls, setAllPolls] = useState<any[]>([]);
    const wallet = useActiveWallet();
    const router = useRouter();
    const connect = useConnect();

    const handleCreatePoll = () => {
        triggerConnect();
        if (address) {
            router.push("/create_AB_testing");
        }
    }

    const triggerConnect = () => {
        const btn = document.querySelector(".tw-connect-wallet") as HTMLButtonElement;
        if (btn) {
            btn.click();
        }
    }

    useEffect(() => {
        const init = async () => {
            const _polls = Array.from((await getPolls()).list);
            console.log("_polls", _polls);
            setAllPolls(_polls);
            const _ongoingPolls = _polls.filter((poll: any) => poll.metadata.endTime > Date.now());
            setOngoingPolls(_ongoingPolls);
            const _completedPolls = _polls.filter((poll: any) => poll.metadata.endTime < Date.now());
            setCompletedPolls(_completedPolls);
        }
        init();
    }, []);

    useEffect(() => {
        if (address) {
            setAddress(address);
        }
        getPolls().then((resp: any) => {
            console.log(resp);
        });
    }, [address]);

    return (
        <div className="w-full mx-auto">
            <ConnectButton/>
            <button
                className="bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg create"
                onClick={handleCreatePoll}
            >
                Create Poll
            </button>
            <WelcomeBanner/>
            <div className="">
                <div className="w-4/5 flex mx-auto">
                <div className=" w-1/2 pr-5">
                    <h2 className="flex gap-4 items-center self-stretch relative bg-transparent tracking-[-0.064em] text-center font-bold leading-[48px] text-[32px] text-black mb-4">
                        Ongoing Polls
                    </h2>
                    {ongoingPolls.map((poll: PollInfo, index: number) => (
                        <PollItem
                            type={PollType.ongoing}
                            poll={poll}
                            key={index}
                        />
                    ))}
                </div>
                <div className=" w-1/2 pl-5">
                    <h2 className="flex gap-4 items-center self-stretch relative bg-transparent tracking-[-0.064em] text-center font-bold leading-[48px] text-[32px] text-black mb-4">
                        Completed Polls
                    </h2>
                        {completedPolls.map((poll: PollInfo, index: number) => (
                            <PollItem
                                type={PollType.completed}
                                poll={poll}
                                key={index}
                            />
                        ))}
                </div>
                </div>
                <button
                    onClick={()=>{connect.connect(metamaskConfig)}}
                >
                    connect
                </button>
            </div>
        </div>
    )
}

const PollItem = (props: {
    poll: PollInfo,
    type: PollType
}) => {
    const btnRef = useRef<any>();
    const router = useRouter();
    const setSelectedPoll = useSetRecoilState(selectedPollAtom);
    const setAddress = useSetRecoilState(addressAtom);
    const setPublicKey = useSetRecoilState(publicKeyAtom);
    const setSecretKey = useSetRecoilState(sercetKeyAtom);
    const address = useRecoilValue(addressAtom);

    const wallet = useActiveWallet();

    const handleJoinPoll = () => {
        getPollById(props.poll.id)
            .then((res) => {
                setSelectedPoll(res);
                console.log("res", res);
                if (res.metadata.isAb) {
                    router.push("/join_AB_testing");
                } else {
                    router.push("/join_poll");
                }
            })
    }
    const handleViewResult = () => {
        router.push("/result");
    }

    const triggerConnect = () => {
        const btn = document.querySelector(".tw-connect-wallet") as HTMLButtonElement;
        if (btn) {
            btn.click();
        }
    }

    const handleClick = async ( ) => {
        if (props.type === PollType.completed) {
            handleViewResult();
        } else {
            if (!address) {
                triggerConnect();
                return;
            }
            wallet?.getAccount()?.signMessage({message: `${props.poll.name}`})
                .then((signature) => {
                    console.log("res", signature);
                    const hashedSig = keccak256(signature);
                    console.log({
                        signature,
                        hashedSig,
                    });

                    const result = genKeyPair(BigInt(hashedSig));
                    setPublicKey(result.publicKey);
                    setSecretKey(result.privateKey);
                    const signUpData = {
                        "pollId": props.poll.id,
                        "address": address.address,
                        "maciPubKey": result.publicKey
                    };
                    console.log(JSON.stringify(signUpData));
                    signUp(signUpData).then((res) => {
                        console.log("Signup", res);
                    }).catch(() => {});
                    handleJoinPoll();
                }).catch(() => {
                    //pass
                })
        }
    }
    useEffect(() => {
        if (address) {
            setAddress(address);
        }
        getPolls().then((resp) => {
            console.log(resp);
        });
    }, [address]);

    return (

        <div className="mb-4 rounded-md shadow p-10 flex justify-between bg-white h-[200px]">
            <div className="w-full box-border">
                <p className="text-black overflow-hidden w-full">{props.poll.name}</p>
                <p className="text-gray-500 overflow-hidden h-[100px] w-full">
                    {props.poll.description}
                </p>
            </div>

            <button
                className="bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleClick}
            >
                {props.type === PollType.completed ? "View Result" : "Join Poll"}
            </button>
        </div>
    )
}

export default HomePage;