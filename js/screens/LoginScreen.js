import { getDataFromDoc, saveCurrentUser, validateEmail, md5 } from "../utils.js";
import { BaseComponent } from "../BaseComponent.js";

let style=/*html*/ `
<style>
    .login-screen{
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        height: 100vh;
        background-image: url(../../media/background1.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }

    .form-login{
        width:25%;
        text-align:center;
        background-color:#DBBDF4;
        border: #494D5F solid 3px;
        box-shadow: 5px 5px #494D5F;
        border-radius:25px;
    }

    .header{
        border: #494D5F solid 3px;
        background-color:#8458B3;
        padding:20px;  
        font-weight:bold;
        border-radius: 25px 25px 0 0;
    }

    .btn-login {
        background-color: #8458B3;
        border: #494D5F solid 2px;
        padding: 10px 30px;
        text-align: center;
        font-size: 16px;
        margin:5px;
    }

    a{
        margin:5px;
    }
</style>`

class LoginScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                email: '',
                password: '',
            },

            data: {
                email: '',
                password: ''
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
        <section class="login-screen">
            <form class="form-login">
                <div class="header">LOGIN FORM</div>
                <input-wrapper class="email" label="Email" type="email" error="${this.state.errors.email}" value="${this.state.data.email}"></input-wrapper>
                <input-wrapper class="password" label="Password" type="password" error="${this.state.errors.password}" value="${this.state.data.password}"></input-wrapper>
                <button class="btn-login">Login</button>
                <br>
                <a href="#!/register">Not have an account? Register</a>
                </form>
        </section>
        `;

        this.$formLogin = this._shadowRoot.querySelector('.form-login');
        this.$formLogin.onsubmit = async (event) => {
            event.preventDefault();

            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;
            let isPassed = true;

            if (email == '' || !validateEmail(email)) {
                isPassed = false;
                this.state.errors.email = "Invalid email";
            } else {
                this.state.errors.email = "";
                this.state.data.email = email;
            }

            if (password == '') {
                isPassed = false;
                this.state.errors.password = "Input your password";
            } else {
                this.state.errors.password = "";
                this.state.data.password = password;
            }

            if (isPassed) {
                let response = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', md5(password))
                    .get();

                if (response.empty) {
                    alert('Email or password is not correct');
                } else {
                    let currentUser = getDataFromDoc(response.docs[0]);
                    saveCurrentUser(currentUser);
                    router.navigate('/index');
                }
            }
        }
    }
}

window.customElements.define('login-screen', LoginScreen);