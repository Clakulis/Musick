var root = null;
var useHash = true;
var hash = '#!';
window.router = new Navigo(root, useHash, hash);

let $app = document.getElementById('app');

window.router.on('/login', function () {
    $app.innerHTML = '<login-screen></login-screen>';
}).resolve();

window.router.on('/register', function () {
    $app.innerHTML = '<register-screen></register-screen>';
}).resolve();

window.router.on('/index', function () {
    $app.innerHTML = '<index-screen></index-screen>';
}).resolve();

window.router.on('/upload', function () {
    $app.innerHTML = '<upload-screen></upload-screen>';
}).resolve();

window.router.on('/user/:id', function (params) {
    let id = params.id;
    if(id==':'){$app.innerHTML = `<user-screen></user-screen>`;}else{
    $app.innerHTML = `<user-screen sid="${id}" choosing="1"></user-screen>`;}
}).resolve();

window.router.on('/upplaylist' , function(){
    $app.innerHTML = '<upplaylist-screen></upplaylist-screen>';
}).resolve();

window.router.on('/playlist/:id', function(params){
    let id = params.id;
    $app.innerHTML = `<playlist-screen pid="${id}"></upplaylist-screen>`;
}).resolve();
// window.router.notFound(function(){
//     $app.innerHTML = "Cannot find this page";
// }).resolve()