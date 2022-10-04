const calculatorDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const modulators = document.querySelectorAll('.mod');


let firstNumberInOperation='';
let secondNumberInOperation='';
let calculatorOperator;
let result;

// numbers.forEach((number)=>{
//     number.addEventListener('click', ()=>{
//         console.log(number);
//     })
// })

// const buttons = document.querySelectorAll('button');
numbers.forEach((number)=>{
    number.addEventListener('click', ()=>{
        if(!calculatorOperator){
            firstNumberInOperation+=number.id;
        }
        else{
            secondNumberInOperation+=number.id;
        }
        console.log('first: ',firstNumberInOperation);
        console.log(calculatorOperator);
        console.log('second: ',secondNumberInOperation);
    });
});

operators.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        
        if(!calculatorOperator && operator.id==='equals'){
            if(firstNumberInOperation){
                result = Number(firstNumberInOperation);
                firstNumberInOperation = '';
            }
            
            console.log(result);
        }
        else if(!calculatorOperator){
            calculatorOperator = operator.id;
        }
        else{
            firstNumberInOperation = firstNumberInOperation ? Number(firstNumberInOperation):result;

            secondNumberInOperation = secondNumberInOperation ? Number(secondNumberInOperation): firstNumberInOperation;


            switch(calculatorOperator){
                case 'add':
                    result = add(firstNumberInOperation, secondNumberInOperation);
                    break
                
                case 'subtract':
                    result = subtract(firstNumberInOperation, secondNumberInOperation);
                    break

                case 'multiply':
                    result = multiply(firstNumberInOperation, secondNumberInOperation);
                    break

                case 'divide':
                    result = divide(firstNumberInOperation, secondNumberInOperation);
                    break

            }
            console.log(result);
            secondNumberInOperation = '';
            firstNumberInOperation = '';
            calculatorOperator = operator.id==='equals' ? '': operator.id;
            result = result === 'lol' ? '':result;
        }
    })
});

function move(numberOfSteps){
    let tempLocationIndex = document.activeElement.getAttribute("data-index-number");
    let newLocationIndex = Number(tempLocationIndex)+numberOfSteps;
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
            move(-1);
            break
        case 'ArrowRight':
            move(1);
            break
        case 'ArrowUp':
            move(-4)
            break
        case 'ArrowDown':
            move(4)
            break
    }
});


function add(a,b){return a+b};
function subtract(a,b){return a-b};
function multiply(a,b){return a*b};
function divide(a,b){
    return b===0 ? 'lol' : Math.round(a/b *100)/100
};
