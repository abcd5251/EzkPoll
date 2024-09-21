"use client"
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { publicKeyAtom, selectedPollAtom, sercetKeyAtom } from "@/state/state";
import { useRecoilValue } from "recoil";
import { poll } from "@/utils/api";

const PageJoinPoll = () => {
    const router = useRouter();
    const selectedPoll = useRecoilValue(selectedPollAtom);
    const publicKey = useRecoilValue(publicKeyAtom);
    const secretKey = useRecoilValue(sercetKeyAtom);
    const [selectedId, setSelectedId] = useState(-1);
    const handleSubmit = () => {
        if (selectedId === -1) {
            alert("have not selected any image");
            return;
        }
        const pollData = {
            "pollId": selectedPoll.id,
            "maciPubKey": publicKey,
            "maciSK": secretKey,
            "optionIndex": selectedId
        };
        console.log(JSON.stringify(pollData));
        poll(pollData).then((res) => {
            console.log(res);
        }).catch(() => {});
        router.push("/do_poll_finish");
    }

    return (
        <div className="rounded-[40px] py-10 px-10 flex flex-col gap-6 items-center relative w-[600px] bg-white mx-auto">
            <h1 className="text-black text-2xl text-center font-bold">
                {selectedPoll.name}
            </h1>
            <p className="text-gray-600 text-md text-center my-8 px-10">
                {selectedPoll.description}
            </p>
            <p className="text-gray-600 text-md text-center mb-2 px-10">
                Choose the prefered image
            </p>
            <div className="flex gap-2 w-full">
                {
                    selectedPoll
                        .questions[0]
                        .options.map((option, index) => {
                            return (
                                <div
                                    className={`w-1/2 ${selectedId === index && ` shadow-[0_0_0_5px_#4285f4]`} bg-black`}
                                    onClick={() => setSelectedId(index)}
                                    role="button"
                                    key={option.id}
                                >
                                    <Image src={option.oimg} alt="image" height={159} width={254} layout="responsive"/>
                                </div>
                            )
                        })
                }
            </div>
            <button
                className="text-[#4285f4] w-[296px] rounded-[9px] px-8 py-[14px] flex gap-6 justify-center items-center self-stretch relative mx-auto my-10 bg-[#e9f1ff] font-bold"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default PageJoinPoll;