import {BaseComponent} from "../BaseComponent.js";

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
            <section class="playlist-screen">
                <navigation-bar></navigation-bar>
                <music-list pid="${this.props.pid}"></music-list>
                <footer></footer>
            </section>`
    }
}

window.customElements.define('playlist-screen', PlaylistScreen);