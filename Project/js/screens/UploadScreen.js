import { getCurrentUser } from "../utils.js";
import { BaseComponent } from "../BaseComponent.js";

let style=/*html*/ `
<style>
    *{
        margin:0;
        padding:0;  
    }
    .upload-screen{
        display:flex;
        justify-content:center;
    }
    .upload-form{
        margin-top:100px;
        width:25%;
        text-align:center;
        background-color:#DBBDF4;
        border: #494D5F solid 3px;
        box-shadow: 5px 5px #494D5F;
        border-radius:25px;
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
class UploadScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                name: '',
                music: '',
                image: '',
            },

            data: {
                name: '',
                music: null,
                image: null,
            }
        }

    }

    render() {
        this._shadowRoot.innerHTML =/*html*/ `
        ${style}
            <navigation-bar></navigation-bar>
            <section class="upload-screen">
                <form class="upload-form">
                    <div class="header">UPLOAD FORM</div>
                    <input-wrapper class="name" label="Song name" type="text" error="${this.state.errors.name}" value="${this.state.data.name}"></input-wrapper>
                    <upload-wrapper class="music" label="Music Link (.mp3 only)" accept="audio/mpeg" error="${this.state.errors.music}" value="${this.state.data.music}"></upload-wrapper>
                    <upload-wrapper class="image" label="Image (.jpeg only)" accept="image/jpeg" error="${this.state.errors.image}" value="${this.state.data.image}"></upload-wrapper>
                    <button class="upload-btn">Upload</button>
                </form>
                <footer></footer>
            </section>
            `
        this.$name = this._shadowRoot.querySelector('.name');
        this.$music = this._shadowRoot.querySelector('.music');
        this.$image = this._shadowRoot.querySelector('.image');
        
        this.$formUpload = this._shadowRoot.querySelector('.upload-form');
        this.$formUpload.onsubmit = async (event) => {
            event.preventDefault();
            
            let name = this.$name.value;
            let music = this.$music.file;
            let image = this.$image.file;
            
            let isPassed = true;

            if (name == '') {
                isPassed = false;
                this.state.errors.name = "Input audio's name";
            } else {
                this.state.errors.name = "";
                this.state.data.name = name;
            }

            if (music == null) {
                isPassed = false;
                this.state.errors.music = "Upload music";
            } else {
                this.state.errors.music = "";
                this.state.data.music = music;
            }

            if (image == null) {
                isPassed = false;
                this.state.errors.image = "Upload image";
            } else {
                this.state.errors.image = "";
                this.state.data.image = image;
            }

            if (isPassed) {
                let musicResponse = await musicsRef.child('music-'+new Date().getTime()).put(music);
                let musicURL = await musicResponse.ref.getDownloadURL();
                let imageResponse = await imagesRef.child('image-' +new Date().getTime()).put(image);
                let imageURL = await imageResponse.ref.getDownloadURL();
                let currentUser = getCurrentUser();
                await firebase.firestore().collection('musics').add({
                    name: name,
                    linkAudio: musicURL,
                    linkImage: imageURL,
                    dateModified: new Date(),
                    owner: currentUser.email
                });

                this.$formUpload.reset();
            }

            this.setState(this.state);
        }
    }
}

window.customElements.define('upload-screen', UploadScreen)