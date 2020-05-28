
    //Basic Functions
    function add(a,b) {
        return (a+b).toFixed(4);
    }
    function sub(a,b){
        return (a-b).toFixed(4);
    }
    function mult(a,b) {
        return (a*b).toFixed(4);
    }
    function divs(a,b) {
        return (a/b).toFixed(4);
    }
    function pow(a,b) {
        return (a**b).toFixed(4);
    }
    function rt(a,b) {
        return (a**divs(1,b)).toFixed(4);
    }

    let displayArr=[""];; //display string
    let opArr=["+","-","/","*","^","√"];
    let mdArr=["*","/","^","√"];
    let asArr=["+","-"];
    let prArr=["^", "√"]

    function getNumArr(arr) { //convert strings to numbers
        let numArr= arr.map( ele => { 
            if (opArr.includes(ele)) {
                return ele;
            }
            else {
                return parseFloat(ele);
            }
        })
        return numArr;
    }

    function operate(arr) {
        let numArr=getNumArr(arr);
        for (let i=0; i<numArr.length; i++) {
            if (opArr.includes(numArr[i])) {
                let index=numArr.indexOf(numArr[i]);
                switch (numArr[i]) {
                    case "+":
                        return add(numArr[index-1],numArr[index+1]);
                    case "-":
                        return sub(numArr[index-1],numArr[index+1]);
                    case "/":
                        if (numArr[index+1]==0) {
                            return "ERROR";
                        }
                        return divs(numArr[index-1],numArr[index+1]);
                    case "*":
                        return mult(numArr[index-1],numArr[index+1]);
                    case "√":
                        if (numArr[index-1]==0) {
                            return "ERROR";
                        }
                        return rt(numArr[index+1],numArr[index-1]);
                    case "^":
                        return pow(numArr[index-1],numArr[index+1]);
                }
            }
        }

    }

    function checkDecimal(str) { //removes zeroes at the end of decimals
        if(str.includes(".")) { 
                    for (let i=str.length-1;i>str.indexOf(".");i-- ) {
                        if (str[i]=="0") {
                            str=str.slice(0,i);
                        }
                        else {
                            break;
                        }}
                    if (str.slice(-1)==".") {
                        str=str.slice(0,str.indexOf("."));
                    }
                    return str;
                    }
        else {
            return str;
        }
    }

    function getDisplay(btn) { //what to put in the display on button click
        let secDisp=document.getElementById("secDisplay")
        let disp=document.getElementById("display");
        let dot=document.getElementById("dot");
        if (btn=="ac") {
            displayArr=[""];
            secDisp.value="";
            disp.value="";
            dot.disabled=false;
        }
        else if (btn=="delete") {
            displayArr[displayArr.length-1]=displayArr[displayArr.length-1].slice(0,displayArr[displayArr.length-1].length-1); //remove last character of the last element
            disp.value=displayArr[displayArr.length-1];
            secDisp.value=displayArr.join("");
            if (!displayArr.join("").includes(".")) {
                dot.disabled=false;
            }
        }
        else if (btn=="dot") {
            displayArr[displayArr.length-1]+=".";
            disp.value=displayArr[displayArr.length-1];
            secDisp.value=displayArr.join("");
            dot.disabled=true; //disable dot unless operator is pressed
        }
        else if (btn=="equal") {
            if (displayArr[0]=="" || asArr.includes(displayArr[0]) || displayArr[displayArr.length-1]=="."){ //if clicked at start
                return;
            }
            if (opArr.includes(displayArr[displayArr.length-2]) && displayArr[displayArr.length-1]=="") { //if clicked after symbol
                return;
            }
            
            if (displayArr.length==5) { //equal to in a 3 number expression (like 1+2*3)
                let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                let ans=operate(tempArr).toString();
                tempArr=displayArr.slice(0, displayArr.length-3);
                tempArr.push(checkDecimal(ans));
                    if (tempArr.includes("ERROR")) { 
                            disp.value="ERROR";
                            displayArr=[""];
                            secDisp.value="";
                            return;    
                        } 
                    if (tempArr.length==3) { //if mutliply/divide was done after a plus/minus compute everything now
                        if (tempArr.includes("ERROR")) { 
                            disp.value="ERROR";
                            displayArr=[""];
                            secDisp.value="";
                            return;    
                        } 
                        ans=operate(tempArr).toString();
                    }
                    displayArr.push("=");
                    displayArr.push("");
                    secDisp.value=displayArr.join("");
                    disp.value=checkDecimal(ans);
                    displayArr=[];
                    displayArr.push(checkDecimal(ans));
                    if (displayArr.join("").includes(".")) {
                         dot.disabled=true; }


            }
            else if (displayArr.length>1) { //equal to works only when there is an operation not when there is just a number
                displayArr.push("=");
                secDisp.value=displayArr.join("");

                let ans=operate(displayArr).toString();
                ans=checkDecimal(ans);
                if (ans=="ERROR") {
                    disp.value=ans;
                    displayArr=[""];
                    secDisp.value="";
                }
                else {
                    disp.value=ans;
                    displayArr=[];
                    displayArr.push(ans);
                    if (displayArr.join("").includes(".")) {
                         dot.disabled=true; }

                }
            }
            
        }
        else {

        if (btn.className=="opn") { //operator button clicks
            dot.disabled=false;
            if (displayArr[0]==".") { //cannot have just a dot at the start
                return;
            }
            else if (displayArr[0]=="") { //cannot start with * /operator 
                if (btn.textContent=="-" || btn.textContent=="+"){
                    displayArr[displayArr.length-1]+=btn.textContent;
                    disp.value=displayArr[displayArr.length-1];
                }
                else {
                    return;
                }
            }
            else if (opArr.includes(displayArr[0])) { //cannot put an operator after a plus or minus at start
                return;
            }
            else if (opArr.includes(displayArr[displayArr.length-2]) && displayArr[displayArr.length-1]=="") { //cannot put multiple operators together
                if (mdArr.includes(displayArr[displayArr.length-2])) { //can put a +/- after *,/
                   if (btn.textContent=="-" || btn.textContent=="+") {
                    displayArr[displayArr.length-1]+=btn.textContent;
                    disp.value=displayArr[displayArr.length-1];
                   }
                }
                else {
                    return;
                }
                
            }
            else if (asArr.includes(btn.textContent)) { //perform operation immediately if add or subtract button is clicked
                if (opArr.includes(displayArr[displayArr.length-2])) {
                    let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                    let ans=operate(tempArr).toString();
                    displayArr=displayArr.slice(0, displayArr.length-3);
                    displayArr.push(checkDecimal(ans));
                    if (displayArr.includes("ERROR")) { 
                            disp.value="ERROR";
                            displayArr=[""];
                            secDisp.value="";
                            return;    
                        } 
                    if (displayArr.length==5) { //if mutliply/divide/pw/root was done after a plus/minus compute everything now
                        if (displayArr.includes("ERROR")) { 
                            disp.value="ERROR";
                            displayArr=[""];
                            secDisp.value="";
                            return;    
                        } 
                        ans=operate(displayArr.slice[3,5]).toString();
                        displayArr=displayArr.slice[0,3];
                        displayArr.push(checkDecimal(ans));
                    }
                    displayArr.push(btn.textContent);
                    displayArr.push("");
                    secDisp.value=displayArr.join("");
                    disp.value="";
                }
                else {
                    displayArr.push(btn.textContent);
                    secDisp.value=displayArr.join("");
                    disp.value="";
                    displayArr.push(""); 
                }
            }
            else if (mdArr.includes(btn.textContent)) { 
                if (prArr.includes(btn.textContent)) {
                    if (prArr.includes(displayArr[displayArr.length-2])) {
                        let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                        let ans=operate(tempArr).toString();
                        displayArr=displayArr.slice(0, displayArr.length-3);
                        displayArr.push(checkDecimal(ans));
                        if (displayArr.includes("ERROR")) { 
                                disp.value="ERROR";
                                displayArr=[""];
                                secDisp.value="";
                                return;    
                            } 
                        if (displayArr.length==5) { //if pw/root was done before compute everything now
                            let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                            let ans=operate(tempArr).toString();
                            tempArr=displayArr.slice(0, displayArr.length-3);
                            tempArr.push(checkDecimal(ans));
                            if (tempArr.includes("ERROR")) { 
                                disp.value="ERROR";
                                displayArr=[""];
                                secDisp.value="";
                                return;    
                            }    
                            if (tempArr.length==3) { //if pw/root was done after a multiply/divide compute everything now
                            if (tempArr.includes("ERROR")) { 
                                disp.value="ERROR";
                                displayArr=[""];
                                secDisp.value="";
                                return;    
                            } 
                            ans=operate(tempArr).toString();
                            } 
                            ans=operate(displayArr.slice[3,5]).toString();
                            displayArr=displayArr.slice[0,3];
                            displayArr.push(checkDecimal(ans));
                        }
                        displayArr.push(btn.textContent);
                        displayArr.push("");
                        secDisp.value=displayArr.join("");
                        disp.value="";
                    }
                    else {
                        displayArr.push(btn.textContent);
                        secDisp.value=displayArr.join("");
                        disp.value="";
                        displayArr.push(""); 
                    }
                }
                
                else if (mdArr.includes(displayArr[displayArr.length-2])) {
                    let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                    let ans=operate(tempArr).toString();
                    displayArr=displayArr.slice(0, displayArr.length-3);
                    displayArr.push(checkDecimal(ans));
                    if (displayArr.includes("ERROR")) { 
                            disp.value="ERROR";
                            displayArr=[""];
                            secDisp.value="";
                            return;    
                        } 
                        if (displayArr.length==5) { //if pw/root was done before compute everything now
                            let tempArr=displayArr.slice(displayArr.length-3,displayArr.length)
                            let ans=operate(tempArr).toString();
                            tempArr=displayArr.slice(0, displayArr.length-3);
                            tempArr.push(checkDecimal(ans));
                            if (tempArr.includes("ERROR")) { 
                                disp.value="ERROR";
                                displayArr=[""];
                                secDisp.value="";
                                return;    
                            }    
                            if (tempArr.length==3) { //if mutliply/divide was done after a plus/minus compute everything now
                            if (tempArr.includes("ERROR")) { 
                                disp.value="ERROR";
                                displayArr=[""];
                                secDisp.value="";
                                return;    
                            } 
                            ans=operate(tempArr).toString();
                            } 
                            ans=operate(displayArr.slice[3,5]).toString();
                            displayArr=displayArr.slice[0,3];
                            displayArr.push(checkDecimal(ans));
                        }
                    
                    displayArr.push(btn.textContent);
                    displayArr.push("");
                    secDisp.value=displayArr.join("");
                    disp.value="";
                }
                else {
                    displayArr.push(btn.textContent);
                    secDisp.value=displayArr.join("");
                    disp.value="";
                    displayArr.push(""); 

                }
               
            }
        }
        else {
            displayArr[displayArr.length-1]+=btn.textContent;
            secDisp.value=displayArr.join("");
            disp.value=displayArr[displayArr.length-1]; }}
    }

    function clicking(btn) {  //what happens on click
        let b=document.getElementById(`${btn}`);
        if (btn!="ac" && btn!="delete" && btn!="equal" && btn!="dot") {
            getDisplay(b);
        }
        else {
            getDisplay(btn);
        }
        
        b.classList.add("clicked");
    }
    
    function removeTransition(e) { //create pressing effect
        if(e.propertyName!="transform") return;
        this.classList.remove("clicked");
    }
    function keyToClick(e) { //connecting keyDown and click
        switch (e.key) {
            case "0":
                clicking("zero");
                break;
            case "1":
                clicking("one");
                break;
            case "2":
                clicking("two");
                break;
            case "3":
                clicking("three");
                break;
            case "4":
                clicking("four");
                break;
            case "5":
                clicking("five");
                break;
            case "6":
                clicking("six");
                break;
            case "7":
                clicking("seven");
                break;
            case "8":
                clicking("eight");
                break;
            case "9":
                clicking("nine");
                break;
            case "+":
                clicking("plus");
                break;
            case "-":
                clicking("minus");
                break;
            case "*":
                clicking("multiply");
                break;
            case "/":
                clicking("divide");
                break;
            case "Backspace":
                clicking("delete");
                break;
            case "=": 
                clicking("equal");
                break;
            case "Enter": 
                clicking("equal");
                break;
            case ".":
                let dot=document.getElementById("dot");
                if(!dot.disabled) {
                    clicking("dot");
                }
                break;
            case "^":
                clicking("pw");
                break;
         }
    }

    let btns=document.querySelectorAll("button");
    btns.forEach(btn => btn.addEventListener("click", () => {clicking(btn.id)} ))
    document.addEventListener("keydown", keyToClick);
    btns.forEach(btn => btn.addEventListener("transitionend",removeTransition));

    
