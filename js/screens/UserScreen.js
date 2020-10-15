import {BaseComponent} from "../BaseComponent.js";

const style = /*html*/ `
<style>
    .user-screen{
        background-color:#E5EAF5;
        height:100vh;
    }
    .tupp-btn {
        background-color: #8458B3;
        border: #494D5F solid 2px;
        padding: 10px 30px;
        text-align: center;
        font-size: 16px;
        margin:5px;
    }
</style>`
class UserScreen extends BaseComponent{
    constructor(){
        super();

        this.props = {
            sid:'',
            choosing:'0',
        }
    }

    static get observedAttributes(){
        return ["sid","choosing"]
    }
    render(){
        this._shadowRoot.innerHTML=/*html*/ `
            ${style}
            <section class="user-screen">
                <navigation-bar></navigation-bar>
                <button class="tupp-btn">Add Playlist</button>
                <playlist-list sid="${this.props.sid}" choosing="${this.props.choosing}"></playlist-list>
                <footer></footer>
            </section>`
        
            this.$tuppBtn = this._shadowRoot.querySelector('.tupp-btn');
            this.$tuppBtn.onclick = ()=>{
                router.navigate('/upplaylist');
            }
    }
}

window.customElements.define('user-screen',UserScreen);