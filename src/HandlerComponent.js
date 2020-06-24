import React from 'react';
import axios from 'axios'

export const ProcessPostRequest = async (url,request_data) => {
    try{
        console.log(request_data);
        let res = await axios.post(url,request_data);
        return res.data.response;
    }catch(err){
        console.log(err);
    }

}
export const ProcessGetRequest = async (url) => {
    try{
        console.log(url)
        let res = await axios.get(url);
        console.log(res);
        return res.data.response;
    }catch(err){
        console.log(err);
    }
}
export const base_url = 'https://0c1cc074c904.ngrok.io/';