import "./globals.css";
import { Amplify } from "aws-amplify";

import ConfigureAmplifyClientSide from "@/utils/amplify/ConfigureAmplifyClientSide";

import AwsConfig from "../aws-exports";

import type { Metadata } from "next";

Amplify.configure(AwsConfig, { ssr: true });

export const metadata: Metadata = {
  title: "Amplify Custom Auth Sandbox",
  description: "Email Sign Up, Sign In, and Sign Out with AWS Amplify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <>
          <ConfigureAmplifyClientSide />
          {children}
        </>
      </body>
    </html>
  );
}
