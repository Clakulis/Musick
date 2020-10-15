import { BaseComponent } from "../BaseComponent.js";
import { getCurrentUser, getDataFromDoc } from "../utils.js";

const style=/*html*/ `
<style>
.playlist-list{
        height: 65vh;
        margin: 100px 20%;    
        border:#494D5F solid 1px;   
        overflow:scroll;
        background-color:white;
    }
</style>`
class PlaylistList extends BaseComponent {
    constructor() {
        super();
        this.props = {
            sid:'',
            choosing:'0'
        }
    }

    static get observedAttributes(){
        return ['sid','choosing']
    }
    async render() {
        let currentUser = getCurrentUser();
        let playlists = await firebase.firestore().collection('playlists').where('owner', '==', currentUser.email).orderBy('dateModified', 'desc').get();
        let html = '';
        for (let doc of playlists.docs) {
            html += /*html*/ `
            <playlist-container pid="${getDataFromDoc(doc).id}" sid="${this.props.sid}" choosing="${this.props.choosing}"></playlist-container>`
        }
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="playlist-list">
                ${html}
            </div>
        `
    }
}

window.customElements.define('playlist-list', PlaylistList);