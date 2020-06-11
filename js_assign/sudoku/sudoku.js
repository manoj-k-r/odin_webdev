let sudoku = [[0,0,0,0,0,0,0,8,0],
[0,4,0,0,1,0,3,0,6],
[0,0,2,0,0,0,0,0,7],
[3,0,0,0,6,0,4,0,0],
[4,0,0,1,8,0,0,0,0],
[0,0,0,3,0,0,9,2,0],
[0,8,0,0,0,0,0,7,0],
[0,0,0,0,0,9,0,0,0],
[6,1,3,8,0,0,0,0,0]];
let colors = ["lightblue", "palegoldenrod","lightgreen","coral","lightgray","lightpink","white","lime","khaki"]
function bigGrid(side){
for (let i=0; i<side**2;i++) {
let container=document.getElementById("container");
let rowHeight= 600/side;
let grid=document.createElement("div");
grid.setAttribute("id", i.toString());
grid.classList.add("bigGrid");
grid.style.backgroundColor=`${colors[i]}`;
grid.style.height=`${rowHeight}px`;
grid.style.width=`${rowHeight}px`;
container.appendChild(grid);
}
}
function gridBuild(side) {       
for (let i=0; i<side;i++) {
for (let j=0; j<side;j++){
    let rowHeight= 600/side-2;
    let grid=document.createElement("div");
    grid.classList.add("grid");
    if (sudoku[i][j]!=0) {
        grid.textContent=`${sudoku[i][j]}`;
    }        
    grid.setAttribute("id", i.toString()+j.toString());
    grid.style.height=`${rowHeight}px`;
    grid.style.width=`${rowHeight}px`;
    let position=3*Math.floor(i/3)+Math.floor(j/3);
    let gridContainer=document.getElementById(`${position}`)
    gridContainer.appendChild(grid); }
} }
bigGrid(3);
gridBuild(9);

function isPossible(board,x,y,n) {
for (let i=0; i<9; i++) {
if (board[x][i]==n) {
    return false;
}
else if (board[i][y]==n) {
    return false;
}
}
xGrid=Math.floor(x/3)*3;
yGrid=Math.floor(y/3)*3;
for (let i=0; i<3; i++) {
for (let j=0;j<3; j++){
    if (board[xGrid+i][yGrid+j]==n){
        return false;
    }
}
}
return true;

}



function solve(board) {
for (let i=0; i<9; i++) {
for (let j=0;j<9;j++){
    if (board[i][j]==0) {
        for (let n=1;n<10;n++){
            if (isPossible(board,i,j,n)) {
                board[i][j]=n;
                let cell=document.getElementById(`${i}${j}`);
                cell.textContent=`${n}`;
                if (solve(board)) {
                    return true;
                }
                else {
                    board[i][j]=0;
                    cell.textContent="0";
                }
            }
        }
        return false;
    }
}
}
return true;
}

function clicked() {
solve(sudoku);
}