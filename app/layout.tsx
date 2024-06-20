import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const poppins = Poppins({weight:['300', '400', '500', '600', '700', '800', '900'] , subsets: ["latin"], display: "swap"});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
  icons: [
    {
      url: '/logo.webp',
      href: '/logo.webp',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
			<html lang="en">
				<body className={poppins.className}>
					<NextSSRPlugin
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					{children}
				</body>
			</html>
		);
}
