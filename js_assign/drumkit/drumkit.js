document.addEventListener("keydown", playSound);
function playSound(e) {
    const music=document.querySelector(`audio[class="${e.keyCode}"]`);
    const key=document.querySelector(`div[class="keys ${e.keyCode}"]`);
    key.classList.add("play");
    if (!music) return; //function needs to end if invalid key. otherwise error msg shown
    music.currentTime=0; //pulls the previous round of audio playing back to the start so that there's no wait for audio end
    music.play();
}
let keys=document.querySelectorAll(".keys");
keys.forEach(key => key.addEventListener("transitionend",removeTransition));

function removeTransition(e) { //tansform ends after key press
    if (e.propertyName!="transform") return; 
    this.classList.remove("play");
} 

