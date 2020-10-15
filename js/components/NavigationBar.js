import {BaseComponent} from "../BaseComponent.js";

let style = /*html*/ `
<style>
    .navigation-bar{
        width:100%;
        height:60px;
        background-color: #494D5F;
        display:flex;
        justify-content:space-around;
        align-items:center;
        position:sticky;
    }

    .icon{
        width:;
        height:80%;
        display:inline-block;
    }

    .upload{
        display:inline-block;
        color: #8458B3;
        font-size:20px;

    }

    .user{
        display:inline-block;
        color: #8458B3;
        font-size:20px;
    }
</style>`
class NavigationBar extends BaseComponent{
    constructor(){
        super();
    }

    render(){
        this._shadowRoot.innerHTML= /*html*/ `
            ${style}
            <div class="navigation-bar">
                <img src="../media/icon.png" alt="" class="icon">
                <div class="upload">UPLOAD</div>
                <div class="user">USER</div>
            </div>`
        
        let logo = this._shadowRoot.querySelector('.icon');
        let upload = this._shadowRoot.querySelector('.upload');
        let user = this._shadowRoot.querySelector('.user');
        logo.onclick = ()=>{
            router.navigate('/index');
        }
        upload.onclick = ()=>{
            router.navigate('/upload');
        }
        user.onclick = ()=>{
            router.navigate('/user/:');
        }
        

    }
}

window.customElements.define('navigation-bar', NavigationBar)