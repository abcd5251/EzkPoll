"use client"
import { Icon } from "@/components/icon"
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import upload_icon from "@/assets/upload.png"
import Image from "next/image";
import { AddressLabel } from "@/components/components";
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";
import { selectedPollAtom } from "@/state/state";
import { useRecoilValue } from "recoil";
import { createPoll } from "@/utils/api";
import { insertRow, upload } from "@/utils/firebaseHelper";
import { templateABTestAtom } from "@/state/state";
const Home = () => {
 
    const router = useRouter();
    const templateABTest = useRecoilValue(templateABTestAtom);
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const deepCopy = (data: any) => {
        return JSON.parse(JSON.stringify(data));
    }
    const handleCreatePoll = async () => {
        const resultPoll = deepCopy(templateABTest);
        resultPoll.name = subject;
        resultPoll.description = description;
        resultPoll.metadata.startTime = Date.now();
        resultPoll.metadata.endTime = Date.now() +  parseInt(duration) * 1000;

        const { url_1, url_2 } = await getUploadImgUrls();
        resultPoll.questions[0].options[0].oimg = url_1;
        resultPoll.questions[0].options[1].oimg = url_2;

        createPoll(resultPoll)
            .finally(() => {
                router.push("/create_poll_finish");
            });
    }
    
    const getUploadImgUrls = async () => {
        const address = "0x4444";
        console.log(address);
        try {
            if (!address) {
                throw new Error('No user or provider')
            }

            if (!image1 || !image2) {
                throw new Error('Please select both images')
            }

            const key = `${address}-${+new Date()}`;
            const url_1 = await upload(`${key}-image1`, image1);
            const url_2 = await upload(`${key}-image2`, image2);

            console.log('Images uploaded successfully.');
            return {url_1, url_2};
        } catch (err: any) {
            console.error(err.message);
        }
        return {url_1: "", url_2: ""};
    };

    return (
        <>
            <AddressLabel/>
            <WelcomeBanner/>
            <div className="bg-white rounded-3xl max-w-2xl mx-auto p-10">
                <div className="flex">
                    <h2 className="text-black text-center text-3xl">Create A/B testing</h2>
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
                        Test Subject
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
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <input
                        className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                        id="description"
                        name="description"
                        type="text" 
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <div className="flex gap-2 my-5">
                        <div className="w-1/2 text-gray-400">
                            <p className="mb-4">
                                Upload Case A image
                            </p>
                            <UploadComponent
                                image={image1}
                                setImage={setImage1}
                                name="img1"
                            />
                        </div>
                        <div className="w-1/2 text-gray-400">
                            <p className="mb-4">
                                Upload Case B image
                            </p>
                            <UploadComponent
                                image={image2}
                                setImage={setImage2}
                                name="img2"
                            />
                        </div>
                    </div>
                    <button
                        className=" mt-5 mx-auto block bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg"
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
    image?: any,
    setImage?: any,
    name: string
}) => {
    const [file, setFile] = useState<any>(undefined);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || ! event.target.files[0]) {
            return;
        }
        //call upload image
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        props.setImage(file);        
    }, [file]);

    return (
        <div className="flex items-center justify-center">
            <label htmlFor={`dropzone-file${props.name}`} className="flex flex-col border-0 items-center justify-center w-full h-64 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <Image src={upload_icon} alt="upload_icon" width={50} height={50}/>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        { file ? file.name : "Upload .JPG/.PNG" }
                    </p>
                </div>
                <input id={`dropzone-file${props.name}`} type="file" className="w-0" onChange={handleFileChange}/>
            </label>
        </div>
    )
}
export default Home;