
    let grids=document.querySelectorAll("div[class=play_area]"); //selecting the board grids
    let board=[["","",""],["","",""],["","",""]];
    let lookupTable ={"X": -10, "O": 10, "tie" : 0 }; //score table
    grids.forEach(grid => grid.addEventListener("click", () => {playRound(grid.id)})); //player always starts
    function playRound(id) {

        let coords=[id.split("")[1],id.split("")[2]]; // Use the id to get the array co-ordinates
        let grid=document.getElementById(`${id}`);
        if (!checkResult(board)){
            if (grid.textContent!="") { //grid not empty
            return 
        }
        else if(grid.textContent=="") {
            board[coords[0]][coords[1]]="X"; //player move, plays X
            grid.textContent="X";
            
            if (!checkResult(board)){
                computerMove(board);}

        }
        }
        if (checkResult(board)){
            let result=document.getElementById("result");
            if (checkResult(board)!="tie"){
                result.textContent=`${checkResult(board)} is the winner`;
            }
            else {
                result.textContent=`It's a ${checkResult(board)}!`;

            }

        }
        function checkResult(a) {

            for (let i=0; i<=2; i++) {
                    if (a[i][0]==a[i][1] && a[i][1]==a[i][2] && a[i][1]=="X"){
                        return "X";
                    }
                    else if (a[i][0]==a[i][1] && a[i][1]==a[i][2] && a[i][1]=="O") {
                        return "O";
                    }
                    else if (a[0][i]==a[1][i] && a[1][i]==a[2][i] && a[1][i]=="X"){
                        return "X";
                    }
                    else if (a[0][i]==a[1][i] && a[1][i]==a[2][i] && a[1][i]=="O"){    
                        return "O";
                    }
            }
            if ((a[0][0]==a[1][1] && a[1][1]==a[2][2] && a[1][1]=="X") || (a[2][0]==a[1][1] && a[1][1]==a[0][2] && a[1][1]=="X")) {
                return "X";
            }
            else if ((a[0][0]==a[1][1] && a[1][1]==a[2][2] && a[1][1]=="O") || (a[2][0]==a[1][1] && a[1][1]==a[0][2] && a[1][1]=="O")) {
                return "O";
            } 
            let count=0
            for (let i=0; i<=2; i++){
                if (a[i].every(ele => ele!="")) {
                    count++
                }
            }
            if (count==3) {
                return "tie"
            }
            return false;
        }
        
        function computerMove(a){
            let bestScore=-Infinity;
            let move;
            for (let i=0; i<=2; i++) {
                for (let j=0; j<=2; j++){
                    if (a[i][j]=="") {
                        a[i][j]="O";
                        let score=minimax(a,0,false);
                        a[i][j]="";
                        if (score>bestScore) {
                            bestScore=score;
                            move=[i,j];
                        }
                    }
                }
            }
            a[move[0]][move[1]]="O";
            let grid_id="p"+`${move[0]}`+`${move[1]}`;
            document.getElementById(grid_id).textContent="O";
         }
         
         function minimax(a,depth,isMax) {
            
            if (checkResult(a)) {
                if (checkResult(a)=="X") {
                    return (lookupTable[checkResult(a)]+depth); }
                else if (checkResult(a)=="O") {
                    return (lookupTable[checkResult(a)]-depth); }
                else{
                    return lookupTable[checkResult(a)]}

                    }
            if (isMax){
                let bestScore=-Infinity;
                for (let i=0; i<=2; i++) {
                    for (let j=0; j<=2; j++){
                        if (a[i][j]=="") {
                            a[i][j]="O";
                            let score=minimax(a,depth+1,false)-depth;
                            a[i][j]="";
                            bestScore=Math.max(score, bestScore);
                        }
                    }
                }
                return bestScore;
            }
            else {
                let bestScore=Infinity;
                for (let i=0; i<=2; i++) {
                    for (let j=0; j<=2; j++){
                        if (a[i][j]=="") {
                            a[i][j]="X";
                            let score=minimax(a,depth+1,true)+depth;
                            a[i][j]="";
                            bestScore=Math.min(score, bestScore);
                        }
                    }
                }
                return bestScore;
            }
            

        }
        
    }
