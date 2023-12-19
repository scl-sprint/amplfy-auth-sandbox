import config from "@/aws-exports"
import { cookies } from "next/headers"
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api"

export const serverClient = generateServerClientUsingCookies({
  config,
  cookies
})