let colorState=false;
function gridBuild(side) {
 for (let i=0; i<side**2;i++) {
    let container=document.getElementById("container");
    let rowHeight= 600/side;
    let grid=document.createElement("div");
    grid.classList.add("grid");
    grid.setAttribute("id", i.toString());
    grid.style.height=`${rowHeight}px`;
    grid.style.width=`${rowHeight}px`;
    container.appendChild(grid);
}
let gridSqs=document.querySelectorAll("div[class=grid]");
gridSqs.forEach(gridSq => gridSq.addEventListener("mouseover", () => {addBlack(gridSq)}));
}

function toggleColor() {
    let gridSqs=document.querySelectorAll("div[class=grid]");
    if (colorState==false) {
        colorState=true;
        gridSqs.forEach(gridSq => gridSq.addEventListener("mouseover", () => {addRandom(gridSq)}));
    }
    else if (colorState==true) {
        colorState=false;
        gridSqs.forEach(gridSq => gridSq.addEventListener("mouseover", () => {addBlack(gridSq)}))
    }
}

/*-- function addShade(a) {
    let currentColor=window.getComputedStyle(a).backgroundColor;
    console.log(currentColor);
    let color=currentColor.split(",");
    let newArr=color.map( element => {
        let removeRGB=element.replace("rgb(","");
        return removeRGB.replace(")","");
    })
    let newColor=newArr.map(rgb => rgb*0.6 );
    a.style.backgroundColor=`rgb(${newColor})`;
} --*/

function addBlack(a) {
    a.style.backgroundColor="rgb(0,0,0)";
}

function addRandom(a) {
    const red= Math.floor(Math.random()*256);
    const green= Math.floor(Math.random()*256);
    const blue= Math.floor(Math.random()*256);
    a.style.backgroundColor=`rgb(${red},${green},${blue})`; 

}

function clearGrid() {
    let colorSqs=document.querySelectorAll(`div[class="grid"]`);
    colorSqs.forEach(colorSq => colorSq.style.backgroundColor="");
}
 
function createNewGrid(){
    let container=document.getElementById("container");
    container.innerHTML="";
    let sideDim=prompt("Number of pixels per side (max 150)");
    let type=parseInt(sideDim);
    if (isNaN(type)==true || sideDim=="" || sideDim<=0 || sideDim>150){
        alert("Invalid input. Here's a 32x32 canvas.");
        gridBuild(32);
       
    }
    gridBuild(sideDim);
}
gridBuild(32);