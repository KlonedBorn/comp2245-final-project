// Copyright 2022 Kyle King
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This function is used to call php files.
 * @param {A string denoting the global variable being set by parameters} method 
 * @param {The website being called} url 
 * @param {Url parameters} param 
 * @returns json string.
 * ~ Working
 */
export function execute_http_request(method,url,param) {
    const xhttp = new XMLHttpRequest()
    let results;
    xhttp.open(method,url,false)
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == XMLHttpRequest.DONE){
            switch(xhttp.status){
                // Ok
                case 200: {
                    results = xhttp.responseText
                } break;
                // Error
                default: {
                    results = "error" 
                }
            }
        }
    }
    xhttp.onerror = (error) => {
        console.error( error );
    }
    xhttp.send(param);
    return results;
}

function get_html_resource(file){

}