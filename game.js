/* [1] After Clicking the Span(start button)  */ 

document.querySelector(".control-buttons span").onclick = function(){
    let userName = prompt("Enter Your Name :");
    /** The name properties */
    if(userName == null || userName== ""){            
        document.querySelector(".name span").innerHTML= 'Undefined';
    }
    else{
        document.querySelector(".name span").innerHTML= userName;
    }
    document.querySelector(".control-buttons").remove();   //After Inserting the name this window would disappear & the window game would appear  
}; 

/** [2] Rotating the images & their duration "memory-game-blocks" */

let duration = 1000;  //After how much rotation happens

// Making the images ordered in random way 
let blocksContainer = document.querySelector(".memory-game-blocks"); //container of images

let blocks = Array.from(blocksContainer.children);  // collect the images in array "children of memory-game-blocks"

let orderedRange=Array.from(Array(blocks.length).keys());  // keys of elements of array
// Dividing them into keys to make them in random way

//console.log(orderedRange);
shuffle(orderedRange);
//console.log(orderedRange);

//Adding order css property to blocks
blocks.forEach((block, index) =>{

    block.style.order = orderedRange[index]; 
 
    //Add click event 
    block.addEventListener('click', function(){
        flipImg(block);
    });

});

// Flip block fuction 
function flipImg(selectedImg){
    selectedImg.classList.add('is-flipped');


    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2){
        
        stopClick();

    //checked matched block function
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
    
}

//Shuffle function
/* Example 
current Array [1,2,3,4,5,6,7,8,9,0]
new array [1,2,3,4,5,6,7,8,9,0]

[1] save current element in temp
[2] current element = random element
[3] random element  = current element in tmp
*/

function shuffle(array){
    let current = array.length,
        tmp , random;
        while(current > 0){
            let random;
            random =Math.floor(Math.random() * current);

            current--;

          // [1] save current element in temp
            tmp = array[current];
          // [2] current element = random element
            array[current] = array[random];
          // [3] random element  = current element in tmp  
            array[random] = tmp;
        }
        return array;
}

//stop click function 

function stopClick(){
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        //remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    },duration);
}

//check matched blocks
function checkMatchedBlocks(first,second){
    // the number of wring tries i do 
    let triesElement = document.querySelector('.tries span');

    //if the two images are matched remove the flipping and match them
    if(first.dataset.icons === second.dataset.icons){
        first.classList.remove('is-flipped'); 
        second.classList.remove('is-flipped');

        first.classList.add('has-match');
        second.classList.add('has-match');

        document.getElementById('success').play();
    }
    else{ // if doesn't match add a wrong try then flip the two images

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1 ;

        setTimeout(()=> {  //the time to flipped remove after wrong try
            first.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
       
        },duration);
        document.getElementById('failure').play();

    }
}




