import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { addressAtom } from "@/state/state";

export const AddressLabel = () => {

    const walletAddress = useRecoilValue(addressAtom);

    return (
        <div className="font-bold bg-white text-gray-500 py-2 px-4 rounded address">
            {
                walletAddress &&
                    walletAddress.address.slice(0, 6) +
                    "..." +
                    walletAddress.address.slice(-4)
            }
        </div>
    )
};

export const FormControl = (props: {
    value: string,
    show: boolean
}) => {

    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(props.value);
    }, [value]);

    return (
        <div className="relative">
            <input
                type={props.show ? "text" : show ? `text` : `password`}
                className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8"
                // onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                {!props.show &&(

                    <button className="cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-gray-500">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                )}
                <button className="ml-2 cursor-pointer">
                </button>
            </div>
        </div>
    )
}