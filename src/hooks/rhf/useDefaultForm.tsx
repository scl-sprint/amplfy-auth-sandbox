import { UseFormProps, UseFormReturn, useForm } from "react-hook-form";

export const useDefaultForm = <FORM_TYPE extends Record<string, any>>(options: UseFormProps<FORM_TYPE> & {
  defaultValues: FORM_TYPE
}): UseFormReturn<FORM_TYPE> => {
  
  return useForm<FORM_TYPE>({
    mode: "onChange",
    ...options
  })
}