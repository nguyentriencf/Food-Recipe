import {RapidAPI_HOST,RapidAPI_KEY} from "@env"
import axios from "axios";

class Http {
   static request(requestOptions){
       /* requestOptions:({
       method,url,headers,body
       })*/
       const option = {method:requestOptions.method};
        option.headers = {
            'x-rapidapi-host': `${RapidAPI_HOST}`,
            'x-rapidapi-key': `${RapidAPI_KEY}`,
            'useQueryString':'true'
        };
        option.url = requestOptions.url;
        if(requestOptions?.params) option.params = requestOptions.params;
        if(requestOptions?.body) option.body = JSON.stringify(requestOptions.body);
        console.log(option);
       return axios.request(option)
              .then(res=>res.data)
              .catch(err =>console.log(err))

    }
}
export default Http