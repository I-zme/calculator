const calculatorDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const modulators = document.querySelectorAll('.mod');





function moveBy(number){
    let tempLocationIndex = document.activeElement.getAttribute("data-index-number");
    let newLocationIndex = Number(tempLocationIndex)+number;
    if(newLocationIndex>20){
        newLocationIndex = newLocationIndex-20;
    }
    if(newLocationIndex<1){
        newLocationIndex = 20+newLocationIndex;
    }
    document.querySelector(`[data-index-number='${newLocationIndex}']`).focus();
}   

document.addEventListener('keydown',e=>{

    switch(e.key){
        case 'ArrowLeft':
            moveBy(-1);
            break
        case 'ArrowRight':
            moveBy(1);
            break
        case 'ArrowUp':
            moveBy(-4)
            break
        case 'ArrowDown':
            moveBy(4)
            break
        case 'Enter':
            break
    }
});

