import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/aws-exports";

export const {runWithAmplifyServerContext} = createServerRunner(
  {config}
)