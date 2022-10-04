const calculatorDisplay = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const modulators = document.querySelectorAll('.mod');


let firstNumberInOperation='';
let secondNumberInOperation='';
let calculatorOperator;
let result;


numbers.forEach((number)=>{
    number.addEventListener('click', ()=>{
        if(!calculatorOperator){
            firstNumberInOperation+=number.id;
            calculatorDisplay.textContent = firstNumberInOperation;
        }
        else{
            secondNumberInOperation+=number.id;
            calculatorDisplay.textContent = secondNumberInOperation;
        }
    });
});

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
                document.getElementById('allClear').focus()
            }
            else{
            result = Math.round(result*100)/100;
            calculatorDisplay.textContent = result;
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
        case 'clear':
            modNumber = clear(modNumber);
            break
        case 'allClear':
            allClear();
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

function clear(number){return number.slice(0,-1)};
function allClear(){
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
            document.getElementById('clear').click();
            document.getElementById('clear').focus();
            break
        case 'control'&&'c':
            document.getElementById('allClear').click();
            document.getElementById('allClear').focus();
    }

});