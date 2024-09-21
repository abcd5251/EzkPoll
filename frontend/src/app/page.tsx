"use client"
import { Icon } from "@/components/icon";
import { injectedMetamaskProvider, metamaskWallet } from "thirdweb/wallets";
import { defineChain } from 'thirdweb';
import { useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react";
import HomePage from "@/components/page_home";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { addressAtom } from "@/state/state";
import { useRouter } from "next/navigation";
import { getPolls } from "@/utils/api";

export default function Home() {

    const address = useActiveAccount();
    const setAddress = useSetRecoilState(addressAtom);
    const showCurrentAddress = async () => {
        console.log("address", address)
    };

    const router = useRouter();

    useEffect(() => {
        if (address) {
            setAddress(address);
        }
        getPolls().then((resp) => {
            console.log(resp);
        });
    }, [address]);
    const handleSignInWithMetaMask = async () => {

        console.log("Sign in with MetaMask clicked");
        const isInstalled = !!injectedMetamaskProvider();

        if (isInstalled) {

            const wallet = metamaskWallet(); 
            
            try {
                const account = await wallet.connect(); 
                console.log("Connected to", account);
                const mumbai = defineChain({
                    id: 80001,
                });
                await wallet.connect({ chain: mumbai });
                console.log("Connected to Mumbai chain");
            } catch (e) {
                console.error("Error connecting to MetaMask", e);
            }
        } else {
            console.error("MetaMask not installed");
        }
    };

    return (
        <HomePage/>
    );
}
