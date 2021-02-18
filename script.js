const inps=document.getElementsByClassName("inp");
const submit=document.getElementById("submit");
const select=document.getElementsByClassName("select")[0];
const errPanel=document.getElementsByClassName("error-panel")[0];
const answrPanel=document.getElementsByClassName("answr-panel")[0];
const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt);
const stepsBool=document.getElementById("steps-bool");
const helpTab=document.getElementsByClassName("help-container")[0];
let direction="";
let y="";
let x="";
let vertex="";
let p="";
let form="";
let equation="";
let equation2="";
let steps="";
let explain="";
let p_form="";

submit.onclick=function(){
    if(empty(inps)){
        errPanel.innerText="Please, fill in fields!";
    }
    else{
        find();
    }
}

function find(){
    elt.style="opacity:0%;width:0px;margin-top:0px;margin-bottom:0px;height:0px;transition:all 0.5s;";
    errPanel.innerText="";
    let xy=select.value;
    let direx=parseInt(inps[0].value);
    let focusX=parseInt(inps[1].value);
    let focusY=parseInt(inps[2].value);
    switch(xy){
        case "X":
            y=focusY;
            form="x";
            x=parseInt(Number((direx + focusX)/2));
            vertex="("+x+","+y+")";
            p=Math.abs(Number(x - focusX));
            
            if(x>=direx){
                direction="right";
                explain=`x, which is equal to ${x}, is greater than the directrix, which is equal to ${direx}.`;
            }
            else if(x<=direx){
                direction="left";
                p_form="-";
                explain=`x, which is equal to ${x}, is less than the directrix, which is equal to ${direx}.`;
            }
            break
        case "Y":
            x=focusX;
            form="y";
            y=parseInt(Number((direx + focusY)/2));
            vertex="("+x+","+y+")";
            p=Math.abs(Number(y - focusY));
            if(y>=direx){
                direction="up"
                explain=`y, which is equal to ${y}, is greater than the directrix, which is equal to ${direx}.`;
            }
            else if(y<=direx){
                direction="down";
                p_form="-";
                explain=`y, which is equal to ${y}, is less than the directrix, which is equal to ${direx}.`;
            }
            break
        default:
            select.style="border:1px solid red; transition: all 0.3s;";
            errPanel.innerText="X or Y? Please pick!";
            setTimeout(function(){
                select.style="border:1px solid black; transition: all 0.5s;";
            },2000)
            break
    }

    function showSteps(bool){
        if(bool.checked){
            if(form=="x"){
                steps=`
                <br/><br/><hr/><br/>
                <i><b><h2>~ Steps ~</h2></b></i>
                <b>1. Get Vertex:</b><br/><br/>
                X = (directrix - focusX) / 2<br/>
                X = (${direx} - ${focusX}) / 2<br/>
                X = ${x};<br/>
                Vertex: ${vertex}<br/><br/>
                <b>2. Get P-value:</b><br/><br/>
                P-value = (|X - focusX|)<br/>
                P-value = (|${x} - ${focusX}|) = ${p}<br/><br/>
                <b>3. Get Direction:</b><br/><br/>
                if x > directrix the direction is right, if x < directrix the direction is left.<br/>
                The direction here is ${direction} because ${explain}<br/><br/>
                <b>4. Equation Setup:</b><br/><br/>
                Equation form 1: 4(p)(x - h) = (y - k)^2 <br/>
                Equation form 2: x = -1/4(p)(y - k)^2 + h <br/><br/>
                <i>Plug in the variables:</i><br/><br/>
                Vertex(x,y) = (h,y)<br/>
                p = p-value<br/>
                Equation form 1: ${equation}<br/>
                Equation form 2: ${equation2} <br/><br/>
                <i>Done</i><br/><br/>
                `;
            }
            else if(form=="y"){
                steps=`
                <br/><br/><hr/><br/>
                <i><b><h2>~ Steps ~</h2></b></i>
                <b>1. Get Vertex:</b><br/><br/>
                Y = (directrix + focusY) / 2<br/>
                Y = (${direx} + ${focusY}) / 2<br/>
                Y = ${y};<br/>
                Vertex: ${vertex}<br/><br/>
                <b>2. Get P-value:</b><br/><br/>
                P-value = (|Y - focusY|)<br/>
                P-value = (|${y} - ${focusY}|) = ${p}<br/><br/>
                <b>3. Get Direction:</b><br/><br/>
                if y > directrix the direction is up, if y < directrix the direction is down.<br/>
                The direction here is ${direction} because ${explain}<br/><br/>
                <b>4. Equation Setup:</b><br/><br/>
                Equation form 1: 4(p)(y - k) = (x - h)^2 <br/>
                Equation form 2: y = 1/4(p)(x - h)^2 + k <br/><br/>
                <i>Plug in the variables:</i><br/><br/>
                Vertex(x,y) = (h,y)<br/>
                p = p-value<br/>
                Equation form 1: ${equation}<br/>
                Equation form 2: ${equation2} <br/><br/>
                <i>Done</i><br/><br/>
                `;
            }
        }
        else{
            steps="";
        }
    }

    if(errPanel.innerText.trim().length==0){
        answrPanel.style="opacity:0%; transition: all 0.5s;";
        findEquation("equate",form,x,y,p);
        showSteps(stepsBool);
        setTimeout(function(){
            answrPanel.style="opacity:100%;margin-bottom:50px;transition: all 0.5s;";
            answrPanel.innerHTML=`
            <i><b><h2>Parabola Features</h2></b></i>
            The vertex is: ${vertex} <br/><br/>
            The p-value is: ${p} <br/><br/>
            The parabola opens : ${direction}<br/><br/>
            Parabola Equation Form 1: ${equation}<br/><br/>
            Parabola Equation Form 2: ${equation2}<br/><br/>
            Graph: <a class="link" onclick=findEquation("graph")>Graph Parbola 📈</a><br/>
            ${steps}
            Still don't get it? <a class="link" href="https://www.youtube.com/results?search_query=get+features+of+parabola+using+focus+and+directrix" target="_Blank">Extra Help 👨‍🏫</a><br/>
            `;
        },500)
    }
}
function findEquation(form,type,h,k,p){
    if(type=="x"){

        equation=`${p_form}4(${p})(x - ${h}) = (y - ${k})^2`;
        equation2=`x = ${p_form}1/4(${p})(y - ${k})^2 + ${h}`;
    }
    else if (type=="y"){
        equation=` ${p_form}4(${p})(y - ${k}) = (x - ${h})^2`;
        equation2=`y = ${p_form}1/4(${p})(x - ${h})^2 + ${k}`;
    }
    if(form=="graph"){
        document.documentElement.scrollTo({
            left: 0,
            top: document.documentElement.scrollHeight - document.documentElement.clientHeight,
            behavior: 'smooth'
          });
          setTimeout(function(){
            elt.style="opacity:0%;margin-top:0px;margin-bottom:0px;width:0px;height:0px;transition:all 0.5s;";
          },500)
        setTimeout(function(){
            elt.style="opacity:100%;width:600px;height:400px;margin-top:50px;margin-bottom:50px;transition:all 0.5s";
            calculator.setExpression({ id: 'graph1', latex: equation});
        },1000)
    }
}

function empty(array){
    for(var i=0;array.length>i;i++){
        if(array[i].value.trim()==0){
            return true;
        }
        else{
            return false;
        }
    }
}




