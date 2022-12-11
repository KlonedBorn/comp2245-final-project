import { execute_http_request } from './utils.js'
import { include_html } from './utils.js'
import { verify_php_session } from './utils.js'

window.onload = (evt) => {
    verify_php_session()
}