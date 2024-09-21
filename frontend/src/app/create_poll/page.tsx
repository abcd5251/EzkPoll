"use client"
import { Icon } from "@/components/icon"
import React, { useState, useRef } from "react";
import upload_icon from "@/assets/upload.png"
import Image from "next/image";
import { AddressLabel } from "@/components/components";
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";
import { Poll } from "@/core/setting";
import { createPoll } from "@/utils/api";

const Home = () => {
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [file, setFile] = useState<any>(null);
    const router = useRouter();

    const handleCreatePoll = async () => {
        const data = await parseJson();
        const resultPoll: Poll = data;
        resultPoll.name = subject;
        resultPoll.description = requestBody;
        resultPoll.metadata.startTime = Date.now();
        resultPoll.metadata.endTime = Date.now() +  parseInt(duration) * 1000;
        resultPoll.address = "0x4444"; //FIXME use address
        createPoll(resultPoll);
        router.push("/create_poll_finish");
    }
    const parseJson = async () => {
        if (file?.name.endsWith(".json")) {
            const buffer = await file.arrayBuffer();
            const byteArray = new Uint8Array(buffer);
            const textData = new TextDecoder().decode(byteArray);
            return JSON.parse(textData);
        }
    }

    return (
        <>
            <AddressLabel/>
            <WelcomeBanner/>
            <div className="bg-white rounded-3xl max-w-2xl mx-auto p-10 mb-10">
                <div className="flex">
                    <h2 className="text-black text-center text-3xl">Create A/B testing poll</h2>
                    {/*FIXME AB testing component*/}
                </div>
                <form action="javascript:void(0)" className="w-full block" onChange={(e) => e.preventDefault()}>
                    <p>
                        You can upload A/B testing images for generating test case
                    </p>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="subject"
                    >
                        Poll Subject
                    </label>
                    <input
                        className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Enter Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <label
                        className="block text-gray-700 text- font-bold mb-2"
                        htmlFor="duration"
                    >
                        Duration
                    </label>
                    <input
                        className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                        id="duration"
                        name="duration"
                        type="text" 
                        placeholder="Select Date Rage"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <div className="w-full text-gray-400">
                        <p className="mb-4">
                            Upload .json file
                        </p>
                        <UploadComponent
                            file={file}
                            setFile={setFile}
                            name="json god"
                        />
                    </div>
                    <button
                        className="w-[296px] mx-auto rounded-[9px] px-8 py-[14px] flex gap-6 justify-center items-center self-stretch relative bg-[#e9f1ff] text-[#4285f4] font-bold mt-5"
                        onClick={handleCreatePoll}
                    >
                        Create Poll
                    </button>
                </form>
            </div>
        </>
    )
}

const UploadComponent = (props: {
    file?: any,
    setFile?: any,
    name: string
}) => {
    const [file, setFile] = useState<any>(undefined);
    return (
        <div className="flex items-center justify-center">
            <label htmlFor="dropzone-file" className="flex flex-col border-0 items-center justify-center w-full h-64 border-0 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <Image src={upload_icon} alt="upload_icon" width={50} height={50}/>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        { props.file ? props.file.name : "Upload .json"}
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="w-0" />
            </label>
        </div> 

    )
}
export default Home;