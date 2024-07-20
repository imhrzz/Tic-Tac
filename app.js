let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;// variable is introduced in order to deal with the  draw condition in the game 

// in order to get turnwise ;//playerX,player Y
let turnO=true;//player Y turns

//dealing with the winning patterns
//2 d array
const winPatterns=[
    [0 ,1, 2],
    [0 ,3, 6],
    [0 ,4, 8],
    [1 ,4, 7],
    [2 ,5, 8],
    [2 ,4, 6],
    [3 ,4, 5],
    [6 ,7, 8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (turnO){

            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        
        box.disabled=true;
        count++;
        
        let IsWinner=checkWinner();
        if( count===9 && !IsWinner){
            gameDraw();
        }
         

    });

});

const resetGame=()=>{
    count=0;
    turnO =true ;
    enableBoxes();
    msgContainer.classList.add("hide");


}
const gameDraw=()=>{
    msg.innerText=`its a draw `;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner=(winner)=>{
    msg.innerText= `Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=() =>{
    for( let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if( pos1Val!=""&& pos2Val!="" && pos3Val !=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val);
                return true;
            
            }
        }
    }
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
