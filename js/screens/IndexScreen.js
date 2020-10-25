import {BaseComponent} from "../BaseComponent.js";

let style= /*html*/ `
<style>
    *{
        margin:0;
        padding:0;
        
    }
    .index-screen{
        height:100vh;
        background-image: url(../../media/background2.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }

</style>
`
class IndexScreen extends BaseComponent{
    constructor(){
        super();

    }

    render(){
        this._shadowRoot.innerHTML=/*html*/ `
            ${style}
            <section class="index-screen">
                <navigation-bar></navigation-bar>
                <music-list></music-list>
                <footer></footer>
            </section>`
    }
}

window.customElements.define('index-screen', IndexScreen);