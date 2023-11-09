import axios from "axios"


export const commonAPI = async (httpsMethod, url, reqBody)=>{
    let reqConfig ={
        method: httpsMethod,
        url: url,
        data:reqBody,
        Headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    } ).catch((err)=>{
        return err
    })
}