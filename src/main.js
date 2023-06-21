// Start game button with Splash Screen
document.querySelector('.control-buttons span').onclick = function () {
    // Ask for Name
    let yourName = prompt('Enter You Name'); 

    // if Name is Empty
    if (yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = 'Unknown'; 
    }else {
        document.querySelector('.name span').innerHTML = yourName ; 
    }

    // Remove splash screen
    document.querySelector('.control-buttons').remove();
    
    // Trigger the firstLook function 
    firstLook()
    
}


let duration = 2000;


let memoryBlocks = document.querySelector('.memory-blocks'); 
let gameBlock = Array.from(memoryBlocks.children);

// get the indexes of the number of blocks in array to be able to shuffle/Rondom the indexes
// Create Range of Keys
// let orderRange = [...Array(gameBlock.length).keys()]; 

let orderRange = Array.from(Array(gameBlock.length).keys()); 

console.log(orderRange)
shuffle(orderRange) ; 
console.log(orderRange)

// Add order CSS Poperty to the game Blocks

gameBlock.forEach((block, index) => {

    block.style.order = orderRange[index] ; 

    block.addEventListener('click', function () {
        flippBlock(block); 
    });
});

// Create flipp Block function 
function flippBlock (selectedBlock) {

    selectedBlock.classList.add('is-flipped'); 

    // Collect all flipped cards
    allFlippedBlocks = gameBlock.filter( flippedBlock => flippedBlock.classList.contains('is-flipped')); 
    
    // if there is two flipped card 
    if (allFlippedBlocks.length === 2 ) {
        console.log('two selected')

        // Trigger Stop clicking function 
        stopClicking(); 

        // Trigger Check matched block function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
    
} 

// Create stop clicking function 
function stopClicking () {
    memoryBlocks.classList.add('stop-clicking'); 

    // set time 
    setTimeout( () => {

        // after the duration, remove stop-clicking class 
        memoryBlocks.classList.remove('stop-clicking');
        
    }, duration)
}

// Create Check matched block function
function checkMatchedBlock(firstBlock, secondBlock) {

    let tries = document.querySelector('.info-container .tries span'); 

    if (firstBlock.dataset.player === secondBlock.dataset.player) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');

        document.getElementById('success').play(); 

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        

        setTimeout (() => {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        }, duration)

        document.getElementById('fail').play(); 
    }
}

// Create shuffle function 
function shuffle (array) {
    let current = array.length, 
    random , 
    temp ; 

    while (current > 0) {
        // Get rondom number
        random = Math.floor(Math.random() * current);
    
        // Decrease length by one 
        current-- ; 

        // save current element in temp 
        temp = array[current]; 

        // current element = rondom element 
        array[current] = array[random]; 

        // rondom element = temp 
        array[random] = temp;
    }
    return array; 
}



function firstLook () {
    for (let i = 0 ; i< gameBlock.length ; i++) {
        gameBlock[i].classList.add('is-flipped'); 
        setTimeout(() => {
            gameBlock[i].classList.remove('is-flipped'); 
        },duration)
    }
}
