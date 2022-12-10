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


export function create_header_html(){

}

/**
 * Credit to w3 for the function
 * https://www.w3schools.com/howto/howto_html_include.asp
 * Searches the html page for tags that have 'include-html' attribute then inserts the html file into the element.
 * @returns void
 */
export function include_html() {
    let z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("include-html");
            include_html();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}

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

export function verify_php_session(){
  let res = execute_http_request('GET','./php/home.php',null)
  try {
      const resp = JSON.parse(res)
      if(resp['status'] != 200){
          alert("User must log-in")
          window.location.href = './login.html'
      }      
  } catch (SyntaxError) {
     console.error("JSON error results: " + res) 
  }
}

function get_html_resource(file){

}