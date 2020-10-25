import {BaseComponent} from "../BaseComponent.js";

const style = /*html*/ `
<style>
    .playlist-screen{
        background-image: url(../../media/background2.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        height:100vh;
    }
</style>`
class PlaylistScreen extends BaseComponent{
    constructor(){
        super();

        this.props = {
            pid:''
        }
    }

    static get observedAttributes(){
        return ['pid'];
    }
    render(){
        this._shadowRoot.innerHTML=/*html*/ `
        ${style}
            <section class="playlist-screen">
                <navigation-bar></navigation-bar>
                <music-list pid="${this.props.pid}"></music-list>
                <footer></footer>
            </section>`
    }
}

window.customElements.define('playlist-screen', PlaylistScreen);