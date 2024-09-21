"use client"
import React, { useEffect, useState } from "react";
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AddressLabel } from "@/components/components";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { selectedPollAtom } from "@/state/state";
import { Question } from "@/core/setting";

const qeustionsSelector = selector({
    key: "question_selector",
    get: ({ get }) => {
        const poll = get(selectedPollAtom);
        return poll.questions;
    },
});

const PageDoPoll = () => {

    const router = useRouter();
    const poll = useRecoilValue(selectedPollAtom);
    const [questions, setQuestions] = useState<Question[]>([]);

    const [selectedOptionId, setSelectedOptionId] = useState(-1);
    const [result, setResult] = useState<number[]>([]);
    const handleSubmit = () => {
        if (selectedOptionId === -1) {
            alert("do not select any option");
            return;
        }
        const finalResult = [...result, selectedOptionId]; // final round selection
        //write summit zk, the result is [...result, selectedOptionId]
        router.push("/do_poll_finish");
    }

    const handleSelectOption = (id: number) => {
        setSelectedOptionId(id);
    }

    const handleBack = () => {
        router.push("/");
    }

    const handleNext = () => {
        setResult([...result, selectedOptionId]);
        setSelectedOptionId(-1);
    }

    //page init
    useEffect(() => {
        setQuestions(poll.questions);
    }, [poll]);

    return (
        <>
            <AddressLabel/>
            <div className="rounded-[40px] py-10 flex flex-col gap-6 items-center relative w-[600px] bg-white mx-auto">
                <h1 className="text-black text-2xl text-center font-bold">
                    {poll.name}
                </h1>
                <p className="text-gray-400 text-md text-center my-8 px-10">
                    {poll.description}
                </p>
                <p className="text-gray-400 text-md text-center mb-2 px-10">
                    Answer single question
                </p>
                <ul>
                    {questions.length &&
                        questions[0].options.map((option, index) => (
                            <li
                                key={index}
                                className="flex gap-[22px] items-center relative w-[520px] bg-transparent bg-white mb-5"
                            >
                                <input
                                    type="radio"
                                    id={`question-${option.id}`}
                                    name={`question-${option.id}`}
                                    value={option.id}
                                    checked={selectedOptionId === option.id}
                                    onChange={() => handleSelectOption(option.id)}                
                                />
                                <label
                                    className="rounded-lg border-[0.5069928765296936px] border-[#e0e0e0] px-6 py-4 flex gap-2.5 items-center flex-1 relative w-full h-[74px] bg-white tracking-[0.056em] leading-5 text-sm text-[#333333]"
                                    htmlFor={`question-${option.id}`}
                                >
                                    {option.odesc}
                                </label>
                            </li>
                    ))}    
                </ul>
                {
                    questions.length > 1 ? (
                        <div className="px-6 flex gap-6 justify-center items-start self-stretch relative w-full bg-transparent">
                            <button
                                className='w-1/2 py-4 text-base bg-gray-500 text-white hover:bg-blue-700 text-blue-700  hover:text-white font-bold rounded-[39px]'
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                className='w-1/2 block py-4 text-base bg-[#5957ff] text-white hover:bg-blue-700 text-blue-700  hover:text-white font-bold rounded-[39px]'
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    ) : (
                        <button
                            className="text-[#4285f4] w-[296px] rounded-[9px] px-8 py-[14px] flex gap-6 justify-center items-center self-stretch relative mx-auto my-10 bg-[#e9f1ff] font-bold"
                            onClick={handleSubmit}
                        >
                            Poll
                        </button>
                    )
                }
            </div>
        </>
    )
}

export default PageDoPoll;