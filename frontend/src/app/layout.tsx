"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/utils/thirdweb";
import { client } from "@/utils/client";
import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ["latin"] });
import { Icon } from "@/components/icon";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          client={client}
        >
          <RecoilRoot>
            <div className="bg-gradient-to-br from-blue-200 to-white min-h-screen flex">
              <div className="w-full mx-auto">
                {/* <div className="mb-10">
                  <Link href="/test" className="bg-red-500 mx-1 rounded p-5">test</Link>
                  <Link href="/create_poll" className="bg-red-500 mx-1 rounded p-5">create poll</Link>
                  <Link href="/create_poll_finish" className="bg-red-500 mx-1 rounded p-5">create poll F</Link>
                  <Link href="/join_poll" className="bg-blue-500 mx-1 rounded p-5">join poll</Link>
                  <Link href="/do_poll" className="bg-blue-500 mx-1 rounded p-5">do poll</Link>
                  <Link href="/do_poll_finish" className="bg-blue-500 mx-1 rounded p-5">do poll F</Link>
                </div>
                <div className="mb-10">
                  <Link href="/create_AB_testing" className="bg-red-500 mx-1 rounded p-5">create AB testing</Link>
                  <Link href="/create_AB_testing_finish" className="bg-red-500 mx-1 rounded p-5">create AB testing F</Link>
                  <Link href="/join_AB_testing" className="bg-blue-500 mx-1 rounded p-5">join AB testing</Link>
                  <Link href="/do_AB_testing" className="bg-blue-500 mx-1 rounded p-5">do AB testing</Link>
                  <Link href="/do_AB_testing_finish" className="bg-blue-500 mx-1 rounded p-5">do AB testing F</Link>
                </div> */}
                <Icon />
                {children}
              </div>
            </div>
          </RecoilRoot>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

{/* <ThirdwebProvider
  chainRpc={{ [ChainId.Mainnet]: "rpc URL here!" }}
  desiredChainId={ChainId.Mainnet}
>
  <Component {...pageProps} />
</ThirdwebProvider> */}