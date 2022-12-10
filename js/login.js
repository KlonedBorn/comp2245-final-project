import { execute_http_request } from './utils.js'
import { include_html } from './utils.js'

const re_email = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"
const re_pswd = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"

// Checks if email and password input fields are empty or not.
function onclick_validate() {
    const inp_email = document.getElementById('email')
    const tooltips = document.getElementsByClassName('tooltip')
    const tt_email = tooltips[0]
    const tt_password = tooltips[1]
    const inp_pswrd = document.getElementById('password')
    const spn_error = document.getElementById('error')

    // TO-DO / Find a way to animate tooltips for email and password login
    spn_error.innerHTML = ""
	inp_pswrd.style.borderColor = "black"
	inp_email.style.borderColor = "black"
    tt_email.style.display = 'none'
    tt_password.style.display = 'none'

    // TO-DO / do front end form validation using regex pattern for input fields.
	if (inp_email.value == "") {
		inp_email.style.borderColor = "red"
        tt_email.style.display = 'flex'
		spn_error.innerHTML = "Please enter all fields"
		return false
	}
	if (password.value == "") {
		password.style.borderColor = "red"
        tt_password.style.display = 'flex'
		spn_error.innerHTML = "Please enter all fields"
		return false
	}
    return true
}
function onclick_login() {
    const inp_email = document.getElementById('email').value
    const inp_pswrd = document.getElementById('password').value
    if(onclick_validate()){
        const results = execute_http_request('GET',`./php/login.php?email=${inp_email}&password=${inp_pswrd}`,null)
        try {
            const res = JSON.parse(results)

            switch(res['status']){
                case 200: {
                    localStorage.setItem('Session-Id',res['session-d'])
                    window.location.href = './home.html'
                } break;
                default: {
                    console.error(res['message'])
                }
            }
        } catch (SyntaxError) {
            console.error('Illegal JSON notation encountered\nresponse text: ' + results)
        }
    }
}

window.onload = (evt) => {
    include_html()
    const btn_login = document.getElementById('loginbtn')
    btn_login.onclick = onclick_login
    const spn_error = document.getElementById('error')
}