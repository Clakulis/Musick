import { getDataFromDoc,getDataFromDocs } from "../utils.js";
import {BaseComponent} from "../BaseComponent.js";

let style = /*html*/ `
<style>
    .music-list{
        height: 65vh;
        margin: 100px 20%;    
        border:#494D5F solid 1px;   
        overflow:scroll;
        background-color:white;
    }
</style>
`
class MusicList extends BaseComponent{
    constructor(){
        super();

        this.props= {
            pid:''
        }
    }

    static get observedAttributes(){
        return ['pid'];
    }

    async render(){
        let musics = [];
        if(this.props.pid ==''){
            musics= await firebase.firestore().collection('musics').orderBy('dateModified','desc').get();
            musics=musics.docs;
        } else { 
            let response = await firebase.firestore().collection('playlists').doc(this.props.pid).get();
            let responses = getDataFromDoc(response).musics;
            for(let doc of responses){
            musics.push(await firebase.firestore().collection('musics').doc(doc).get());}
        }
        let html = '';
        for (let doc of musics){
            html+=/*html*/ `<music-container pid="${this.props.pid}" docid="${doc.id}" name="${getDataFromDoc(doc).name}" link-image="${getDataFromDoc(doc).linkImage}" link-audio="${getDataFromDoc(doc).linkAudio}"></music-container>`
        }
        
        this._shadowRoot.innerHTML=/*html*/ `
            ${style}
            <section class="music-list">
                ${html}
            </section>`
        }
}

window.customElements.define('music-list', MusicList);