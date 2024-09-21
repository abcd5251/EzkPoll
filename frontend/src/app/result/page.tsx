"use client";
import React, { useEffect, useRef } from "react";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from "react-chartjs-2";
import { useRouter } from "next/navigation";

Chart.register(ArcElement);
Chart.register(Tooltip);
Chart.register(Legend);


const PageShowResult = () => {
    const canvasEl = useRef<any>(null);
    const router = useRouter();
    
        const options = {
            plugins: {
                datalabels: {
                    formatter: (value: any, ctx: any) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },

                }
            }
        };
        const data = {
            labels: ['BTC', 'ETH'],
            datasets: [{
                label: 'which one is your favorite?',
                data: [50, 300],
                backgroundColor: ['#fdd09f', '#fed0ee'],
                hoverOffset: 4,
            }],
            options: options
        };
    const handleBack = () => {
        router.push("/");
    }

    return (
        <>
            
            <h1 className="text-black text-4xl text-center font-bold mb-10">
                Poll Result
            </h1>
            <button
                className="text-black text-xl ml-10 mb-5 font-bold "
                onClick={handleBack} 
            > 
                {`<`} Back
            </button>
            <div className=" py-10 px-10 flex flex-col gap-6 items-center relative w-full bg-white mx-auto mb-10">
                <div className="w-[600px] h-[700px]">
                    <Doughnut data={data}/>
                </div>
            </div>
        </>
    )
}

export default PageShowResult