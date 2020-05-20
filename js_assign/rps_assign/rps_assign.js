let rn=1;
        let us=0;
        let cs=0;
        function roundtracker(){
            document.getElementById("roundno").textContent=`Round: ${rn}`;
        }
        roundtracker();
        function userstracker(){
            document.getElementById("userscor").textContent=us;
        }
        userstracker();
        function compstracker() {
            document.getElementById("compscor").textContent=cs;
        }
        compstracker();
        function gmOvr() {
            if (rn==6) {
                let over=document.getElementById("over");
                over.style.padding="0px";
                let winner;
                if(us>cs){
                    over.textContent="Congrats! You beat the computer!";
                }
                else if(cs>us){
                    over.textContent="Nice Try! But the computer beat you!";
                }
                else {
                    over.textContent="Tie Game!";
                }
               
                document.getElementById("roundno").textContent="Game Over";
                userstracker();
                compstracker();
                let btnArr=["rock","paper","scissors"];
                for (i=0;i<=2;i++) {
                    let btn=document.getElementById(btnArr[i]);
                    btn.disabled= true;
                    btn.style.backgroundColor= "grey"
                }
            }
        } 
        function playGame(uc) {
            document.getElementById("over").textContent="";
            let result=document.getElementById("results");
            result.style.padding="0px";
            result.textContent=rps(uc,compPlay());
            function compPlay() {
                let rpsArr=["rock","paper","scissors"]
                return rpsArr[Math.floor(Math.random()*rpsArr.length)];
            }
            function rps(choice1,choice2) {
                let a = choice1;
                let b = choice2;
                if(a=="rock" && b=="scissors" || a=="paper" && b=="rock" || a=="scissors" && b=="paper") {
                    let res=`You won Round ${rn}. Computer chose ${cap(b)}!`; 
                    rn++;
                    us++;
                    roundtracker();
                    userstracker();
                    gmOvr();
                    return res;
                }
                else if(b=="rock" && a=="scissors" || b=="paper" && a=="rock" || b=="scissors" && a=="paper") {
                    let res=`You lost Round ${rn}. Computer chose ${cap(b)}!`; 
                    rn++;
                    cs++;
                    compstracker();
                    roundtracker();
                    gmOvr();
                    return res;
                }
                else if(a==b) {
                    let res=`Computer chose ${cap(b)} as well! Round ${rn} was a tie.`;
                    rn++;
                    roundtracker();
                    gmOvr();
                    return res;
                }
            }
            function cap(x) {
                return x[0].toUpperCase()+x.slice(1,x.length);
        
            }
        }
        function reset(){
            let btnArr=["rock","paper","scissors"];
            let btnClr=["black","blue","green"]
                for (i=0;i<=2;i++) {
                    let btn=document.getElementById(btnArr[i]);
                    btn.disabled= false;
                    btn.style.backgroundColor= btnClr[i];
                }
            rn=1;
            us=0;
            cs=0;
            roundtracker();
            userstracker();
            compstracker();
            let over=document.getElementById("over");
            over.style.padding="20px";
            over.textContent="";
            let result=document.getElementById("results");
            result.style.padding="20px";
            result.textContent="";
        }
        document.querySelector("#rock").addEventListener('click', () => {playGame("rock")});
        document.querySelector("#paper").addEventListener('click', () => {playGame("paper")});
        document.querySelector("#scissors").addEventListener('click', () => {playGame("scissors")});
    
