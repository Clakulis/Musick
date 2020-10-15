import {BaseComponent} from "../BaseComponent.js";
import { download, getDataFromDoc } from "../utils.js";

let style = /*html*/ `
<style>
    .music{
        width:90%;
        padding: 10px 5%;
        border-bottom:#494D5F solid 1px;
        align-items:center;
        display:flex;
    }

    .image{
        width:50px;
        height:50px;
    }
    .music-name{
        display:inline-block;
        margin-left:20px;
        font-size:20px;
    }
    .add-to-playlist{
        width:30px;
        height:30px;
        position: absolute;
        right:30%;
    }
    .remove-from-playlist{
        width:30px;
        height:30px;
        position:absolute;
        right:27%;
    }
    .download-btn{
        width:30px;
        height:30px;
        position:absolute;
        right:24%;
    }
</style>`
class MusicContainer extends BaseComponent{
    constructor(){
        super();

        this.props = {
            "link-image":'',
            name:'',
            "link-audio":'',
            locate:'',
            docid:'',
            pid:''
        }
    }

    static get observedAttributes(){
        return ['link-image','name','link-audio','locate','docid','pid'];
    }

    render(){
        
        let html='';
        let checkid=false;
        if(this.props.pid==''){
            html = /*html*/`<button class="add-to-playlist">➕</button>
            <button class="download-btn">⬇</button>`
        } else {
            html =/*html*/`<button class="add-to-playlist">➕</button>
                    <button class="remove-from-playlist">✖</button>
                    <button class="download-btn">⬇</button>`
                    checkid=true;
        }
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="music">
                <img src="${this.props["link-image"]}" alt="img" class='image'>
                <div class="music-name">${this.props.name}</div>
                ${html}
                </div>
            </div>
            `
        this.$addToPlayList = this._shadowRoot.querySelector('.add-to-playlist')
        this.$addToPlayList.onclick = ()=>{
            router.navigate(`/user/${this.props.docid}`);
        }
        this.$downloadBtn = this._shadowRoot.querySelector('.download-btn');
        this.$downloadBtn.onclick = async ()=>{
            let response = await firebase.firestore().collection('musics').doc(this.props.docid).get();
            let link = getDataFromDoc(response).linkAudio;
            download(link, `music${new Date().getTime()}.mp3`)
        }
        this.$removeFromPlaylist = this._shadowRoot.querySelector('.remove-from-playlist')
        if(this.props.pid!=''){
            this.$removeFromPlaylist.onclick = async ()=>{
                let response = await firebase.firestore().collection('playlists').doc(this.props.pid).get();
                let responses = getDataFromDoc(response).musics;
                for(let i = 0; i<responses.length;i++){if(this.props.docid==responses[i])responses.slice(i,i+1)}
                await firebase.firestore().collection('playlists').doc(this.props.id).update({
                    musics:responses,
                })
            }
        }
    }
}

window.customElements.define('music-container',MusicContainer)