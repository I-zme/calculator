const calculatorDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const modulators = document.querySelectorAll('.mod');


let firstNumberInOperation='';
let secondNumberInOperation='';
let calculatorOperator;
let result;

window.addEventListener('load', ()=>{
    calculatorDisplay.textContent = 'sup?'
});


numbers.forEach((number)=>{
    number.addEventListener('click', ()=>{
        if(!calculatorOperator){
            firstNumberInOperation = makeNumberInOperation(firstNumberInOperation, number);
        }
        else{
            secondNumberInOperation = makeNumberInOperation(secondNumberInOperation, number);

        }
    });
});

function makeNumberInOperation(numberInOperation,number){
    if(numberInOperation.length<9){
        numberInOperation += number.id;
        calculatorDisplay.textContent = numberInOperation;
    }
    return numberInOperation
}

operators.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        
        if(!calculatorOperator && operator.id==='equals'){
            if(firstNumberInOperation){
                result = Math.round(Number(firstNumberInOperation)*100)/100;
                firstNumberInOperation = '';
            }            
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
            
            if(result==='lol'){
                calculatorDisplay.textContent = result;
                result = '';
                document.getElementById('clear').focus()
            }
            else{
                result = Math.round(result*100)/100;
                if(Math.ceil(Math.log10(Math.sqrt(result**2) + 1))>9){
                    calculatorDisplay.textContent = result.toExponential();
                    document.getElementById('clear').focus();
                    result = '';
                }
                else{
                    calculatorDisplay.textContent = result;
                }
                calculatorOperator = operator.id==='equals' ? '': operator.id;
            }
            secondNumberInOperation = '';
            firstNumberInOperation = '';
        }
    })
});


function add(a,b){return a+b};
function subtract(a,b){return a-b};
function multiply(a,b){return a*b};
function divide(a,b){return b===0 ? 'lol' : a/b;};


modulators.forEach((mod)=>{
    mod.addEventListener('click', ()=>{
        modNumber = calculatorDisplay.textContent;
        modNumber = modFunc(mod, modNumber);
        if(secondNumberInOperation){
            secondNumberInOperation = modNumber;
        }
        else{
            firstNumberInOperation = modNumber;
        }
        calculatorDisplay.textContent = modNumber;
        // if(secondNumberInOperation){
        //     secondNumberInOperation =  modFunc(mod, secondNumberInOperation);
        // }
        // else if(firstNumberInOperation){
        //     firstNumberInOperation = modFunc(mod, firstNumberInOperation);
        // }
        // else{
        //     result = Number(modFunc(mod, result.toString()));
        // }
    });
});

function modFunc(mod, modNumber){
    switch(mod.id){
        case 'backspace':
            modNumber = backspace(modNumber);
            break
        case 'clear':
            clear();
            modNumber='';
            break
        case 'percent':
            modNumber = percent(modNumber);
            break

        case 'plusminus':
            modNumber = plusminus(modNumber);
            break
        case 'dot':
            modNumber = modNumber.includes('.') ? modNumber:dot(modNumber);
            break
    }
return modNumber
}

function backspace(number){return number.slice(0,-1)};
function clear(){
    firstNumberInOperation = '';
    secondNumberInOperation = '';
    calculatorOperator = '';
};
function percent(number){return number/100};
function plusminus(number){return -number};
function dot(number){return number+='.'}


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

    switch(e.key.toLocaleLowerCase()){
        case 'arrowleft':
            move(-1);
            break
        case 'arrowright':
            move(1);
            break
        case 'arrowup':
            move(-4)
            break
        case 'arrowdown':
            move(4)
            break
        case 'backspace':
            document.getElementById('backspace').click();
            document.getElementById('backspace').focus();
            break
        case 'control'&&'delete':
            document.getElementById('clear').click();
            document.getElementById('clear').focus();
    }

});