import {BaseComponent} from "../BaseComponent.js";

const style=/*html*/ `
<style>
    .upload-wrapper{
        background-color:#DBBDF4;
        margin:5px;
    }
    .input-label{
        color:#8458B3;
    }
    .input-main{
        width:90%;
        padding:7px;
        border-radius:10px;
        border: #A0D2EB solid 2px;
        background-color: #E5EAF5;
    }
    .input-error{
        color:red;
    }

    
</style>`

class UploadWrapper extends BaseComponent{
    constructor(){
        super();

        this.props={
            label:'',
            error:'',
            accept:'',
            value:''
        };
    }

    static get observedAttributes(){
        return ['label','error','accept','value'];
    }

    render(){
        this._shadowRoot.innerHTML=/*html*/ `
            ${style}
            <div class="upload-wrapper">
                <label for="input" class="input-label">${this.props.label}</label>
                <br>
                <input type="file" accept="${this.props.accept}" class="input-main" value="${this.props.value}">
                <div class="input-error">${this.props.error}</div>
            </div>`
    }

    get file(){
        return this._shadowRoot.querySelector('.input-main').files[0];
    }
}

window.customElements.define('upload-wrapper', UploadWrapper);