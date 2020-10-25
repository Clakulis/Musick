import { getCurrentUser } from "../utils.js";
import { BaseComponent } from "../BaseComponent.js";

let style=/*html*/ `
<style>
    *{
        margin:0;
        padding:0;  
    }
    .upplaylist-screen{
        display:flex;
        justify-content:center;
        background-image: url(../../media/background2.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        height:100vh;
    }
    .upload-form{
        margin-top:100px;
        width:25%;
        text-align:center;
        background-color:#DBBDF4;
        border: #494D5F solid 3px;
        box-shadow: 5px 5px #494D5F;
        border-radius:25px;
        height:280px;
    }
    .upload-btn {
        background-color: #8458B3;
        border: #494D5F solid 2px;
        padding: 10px 30px;
        text-align: center;
        font-size: 16px;
        margin:5px;
    }
    .header{
        border: #494D5F solid 3px;
        background-color:#8458B3;
        padding:20px;  
        font-weight:bold;
        border-radius: 25px 25px 0 0;
    }
</style>`
class UpPlaylistScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                name: '',
                image: '',
            },

            data: {
                name: '',
                image: null,
            }
        }

    }

    render() {
        this._shadowRoot.innerHTML =/*html*/ `
            ${style}
            <navigation-bar></navigation-bar>
            <section class="upplaylist-screen">
                <form class="upload-form">
                    <div class="header">Create Playlist</div>
                    <input-wrapper class="name" label="Playlist's name" type="text" error="${this.state.errors.name}" value="${this.state.data.name}"></input-wrapper>
                    <upload-wrapper class="image" label="Image (.jpeg only)" accept="image/jpeg" error="${this.state.errors.image}" value="${this.state.data.image}"></upload-wrapper>
                    <button class="upload-btn">Create</button>
                </form>
                <footer></footer>
            </section>
            `
        this.$name = this._shadowRoot.querySelector('.name');
        this.$image = this._shadowRoot.querySelector('.image');
        
        this.$formUpload = this._shadowRoot.querySelector('.upload-form');
        this.$formUpload.onsubmit = async (event) => {
            event.preventDefault();
            
            let name = this.$name.value;
            let image = this.$image.file;
            
            let isPassed = true;

            if (name == '') {
                isPassed = false;
                this.state.errors.name = "Input playlist's name";
            } else {
                this.state.errors.name = "";
                this.state.data.name = name;
            }


            if (image == null) {
                isPassed = false;
                this.state.errors.image = "Upload image";
            } else {
                this.state.errors.image = "";
                this.state.data.image = image;
            }

            if (isPassed) {
                let imageResponse = await imagesRef.child('image-' +new Date().getTime()).put(image);
                let imageURL = await imageResponse.ref.getDownloadURL();
                let currentUser = getCurrentUser();
                await firebase.firestore().collection('playlists').add({
                    name: name,
                    linkImage: imageURL,
                    dateModified: new Date(),
                    owner: currentUser.email,
                    musics:[],
                });
                alert('Upload Successful');
                this.$formUpload.reset();
            }
            
            this.setState(this.state);
        }
    }
}

window.customElements.define('upplaylist-screen', UpPlaylistScreen)