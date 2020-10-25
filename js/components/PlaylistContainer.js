import { getCurrentUser, getDataFromDoc } from "../utils.js";
import { BaseComponent } from "../BaseComponent.js";

const style = /*html*/`
<style>
    .playlist-container{
        display:inline-block;
        text-align:center;
        width:270px;
        height:270px;
        margin:20px;

    }
    .image{
        margin:30px 35px 15px 35px;
        width:200px;
        height:200px;
    }
    .name{
        font-size:25px;
        color:#8458B3;
        display:inline-block;
    }
    .delete-btn{
        width:25px;
        height:25px;
        background-color:#494D5F;
        color:#8458B3;
    }
</style>`
class PlaylistContainer extends BaseComponent {
    constructor() {
        super();

        this.props = {
            pid: '',
            sid: '',
            choosing: '0'
        }

        this.state = {
            dateModified:'',
            linkImage:'',
            musics:[],
            name:'',
            owner:''
        }
    }

    static get observedAttributes() {
        return ['pid','sid','choosing'];
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <div class="playlist-container">
                <img src="${this.state.linkImage}" alt="" class="image">
                <div class="name">${this.state.name}</div>
                <button class="delete-btn">✖</button>
            </div>  
        `
        this.$image = this._shadowRoot.querySelector('.image');
        this.$deleteBtn = this._shadowRoot.querySelector('.delete-btn');
        this.$image.onclick = async ()=>{
            if(this.props.choosing=='0'){
                router.navigate(`/playlist/${this.props.pid}`);
            } else {
                let response = await firebase.firestore().collection('playlists').doc(this.props.pid).get();
                response = getDataFromDoc(response).musics;
                response.push(this.props.sid);
                await firebase.firestore().collection('playlists').doc(this.props.pid).update({
                    musics:response,
                });
                alert('Added to playlist');
            }
        }
        this.$deleteBtn.onclick = ()=>{
            console.log(this.props.pid)
            firebase.firestore().collection('playlists').doc(this.props.pid).delete()
            .then(() => {
                alert('Playlist deleted');
                location.reload();
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    async componentDidMount() {
        if (this.props.pid != '') {
            let result = await firebase.firestore().collection('playlists').doc(this.props.pid).get();
            let playlist = getDataFromDoc(result);
            this.setState(playlist);
        }
    }
}

window.customElements.define('playlist-container', PlaylistContainer);