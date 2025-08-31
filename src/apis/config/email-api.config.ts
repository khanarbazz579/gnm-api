import { CanExternalApiOptions } from "@can/common/types/external-api.type";

  export const EMAIL_API_CONFIG:CanExternalApiOptions = {
    url : process.env.EMAIL_API_URL,
    method : 'POST',
    data : {
        templateId:process.env.EMAIL_TEMPLATE_ID,
        toEmails:[],
        fromEmail:process.env.SENDER_EMAIL,
        params:{
           
        }
    },
    headers : {
        'Content-Type': 'application/json'
    }
  };