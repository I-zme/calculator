
const calculatorDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const modulators = document.querySelectorAll('.mod');


const buttons = document.querySelectorAll('button');

function moveBy(number){
    let tempLocationIndex = document.activeElement.getAttribute("data-index-number");
    let newLocationIndex = Number(tempLocationIndex)+number;
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
            break
        case 'ArrowDown':
            break
        case 'Enter':
            break

    }
});

