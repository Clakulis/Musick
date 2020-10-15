import {BaseComponent} from "../BaseComponent.js";

const style=/*html*/ `
<style>
    .input-wrapper{
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

class InputWrapper extends BaseComponent{
    constructor(){
        super();

        this.props={
            label:'',
            type:'text',
            error:'',
            value:''
        };
    }

    static get observedAttributes(){
        return ['label','type','error','value'];
    }

    render(){
        this._shadowRoot.innerHTML=/*html*/ `
            ${style}
            <div class="input-wrapper">
                <label for="input" class="input-label">${this.props.label}</label>
                <br>
                <input type="${this.props.type}" value="${this.props.value}" class="input-main">
                <div class="input-error">${this.props.error}</div>
            </div>`
    }

    get value(){
        return this._shadowRoot.querySelector('.input-main').value;
    }
}

window.customElements.define('input-wrapper', InputWrapper);