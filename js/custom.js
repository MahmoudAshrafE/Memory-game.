document.querySelector(".control-btn span").onclick = function(){
    let yourName =prompt("Whats Your Name?");
    if (yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML ="Unknown";
    }else{
        document.querySelector(".name span").innerHTML =yourName;
    }
    document.querySelector(".control-btn").remove();




let duration = 1000;
let blockscontainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockscontainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocks.forEach((block , index)=>{
        block.classList.add(('is-flib'));
    setTimeout( ()=>{
        block.classList.remove(('is-flib'));
    },2000);

    block.style.order = orderRange[index];
    block.addEventListener('click' , function (){
        flibBlock(block);
    });
});

function shuffle(array){
let current =array.length ,
temp ,
random;
while(current > 0) {

    random = Math.floor(Math.random()*current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp
}
return array;
}

function flibBlock(selectedBlock){
    selectedBlock.classList.add('is-flib');

    let allFlibedBlocks = blocks.filter(fBlock => fBlock.classList.contains('is-flib'));

    if (allFlibedBlocks.length === 2){
        stopClicking();
        blocksMatched(allFlibedBlocks[0],allFlibedBlocks[1]);
    }


}


function stopClicking() {
    blockscontainer.classList.add('no-clicking');
    setTimeout( () => {
    blockscontainer.classList.remove('no-clicking');
    },duration);
}

function blocksMatched(firstBlock , secondBlock) {
let triesElement = document.querySelector('.tries span');
if(firstBlock.dataset.animale === secondBlock.dataset.animale){
    firstBlock.classList.remove('is-flib');
    secondBlock.classList.remove('is-flib');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');
    document.getElementById('sucess').play();
    winScreen();
}
else{
    setTimeout( () => {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        if(triesElement.innerHTML == 10){
            document.getElementById("lose").style.display = "block";
            push();

        document.getElementById('failer').play();
        }
        },500);
    document.getElementById('fail').play();

}
    setTimeout( () => {
        firstBlock.classList.remove('is-flib');
        secondBlock.classList.remove('is-flib');
        },duration);
}

function winScreen(){
    let allHasMatched = blocks.filter(match => match.classList.contains('has-match'));
    if(allHasMatched.length === 20){
    push();

        setTimeout( () =>{
            document.getElementById("win").style.display = "block";
    document.getElementById('win-audio').play();
        },duration);
    }
}


var timer;
var ele = document.getElementById('timer');
(function(){
    var sec = 99;
    setTimeout( ()=>{
        timer = setInterval(() => {
            ele.innerHTML =  "🕓"+sec +"🕓" ;
            sec--;
            if (sec == -1){
                push();
                document.getElementById("lose").style.display = "block";
                document.getElementById('failer').play();
            }

            
        }, 1000);
        
    },1500)
})()
function push(){
    clearInterval(timer);
}
}


