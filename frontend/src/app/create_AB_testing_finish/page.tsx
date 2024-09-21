"use client"
import { AddressLabel } from '@/components/components';
import thumbUp from '../../assets/thumb_up.png';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const PageFinishCreate = () => {

    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    }

    const handlePreview = () => {
        router.push("/join_poll");
    }

    return (
        <>
            <AddressLabel/>
            <div className='flex flex-col max-w-xl mx-auto'>
                <h1 className="text-black text-4xl text-center font-bold">
                    Congrats! Your Testcase just published!
                </h1>
                <p className="text-gray-600 text-xl text-center my-10">
                    Your voice matters and will make impact to he better world
                </p>
                <div className="rounded-[40px] py-10 flex flex-col gap-6 items-center relative w-[600px] bg-white">

                    <Image src={thumbUp} width={296} height={244} alt="finish"/>
                    <div className="px-6 flex gap-6 justify-center items-start self-stretch relative w-full bg-transparent">
                        <button
                            className='w-1/2 py-4 text-base bg-gray-500 text-white hover:bg-blue-700 text-blue-700  hover:text-white font-bold rounded-[39px]'
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button
                            className='w-1/2 block py-4 text-base bg-[#5957ff] text-white hover:bg-blue-700 text-blue-700  hover:text-white font-bold rounded-[39px]'
                            onClick={handlePreview}
                        >
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageFinishCreate;