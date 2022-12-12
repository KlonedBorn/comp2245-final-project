import { verify_php_session } from "./utils.js"

window.onload = () => {
    const request = verify_php_session()
    fetch(`php/notes.php`)
    .then(response => response.text())
    .then( data => {
        const res = JSON.parse(data)
        document.getElementById('prefix-info').innerHTML = res['prefix-info']
        document.getElementById('futher-info').innerHTML = res['futher-info']
        document.getElementById('note-container').innerHTML = res['note-container']
    })
    // if( request['role'] != 'Admin') {
    //     document.getElementById('add-user').style.display = 'none'
        
    // }
}

// fetch(`php/notes.php`)
// .then(response => response.text())
// .then( data => {
// document.getElementById("users-table").innerHTML = data
// })