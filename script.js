$(document).ready(function(){
    const btn = $(".calc_button");
    const screenMain = $(".screen_main");
    const screenMemory = $(".screen_memory");
    let move, memory, currentNumber, previousNumber;
    currentNumber = 0;
    previousNumber = 0;
    move = "";

    updateScreen();

    btn.on("click", function(){
        let input = $(this).text();
        switch(input){
            case "+":
            case "-":
            case "×":
            case "÷":
            case "=":{
                moveHandle(input);
                break;
            }
            default: {
                currentNumber *= 10;
                currentNumber += parseInt(input);
                updateScreen();
            }
        };
    });

    function moveHandle(nextMove = ""){
        if(nextMove === "=" && (move === "" || move === "=")){return;}
        switch(move){
            case "":{previousNumber = currentNumber; move = nextMove; break;}
            case "+":{previousNumber += currentNumber; break;}
            case "-":{previousNumber -= currentNumber; break;}
            case "×":{previousNumber *= currentNumber; break;}
            case "÷":{
                if(currentNumber !== 0){
                    previousNumber /= currentNumber;
                }else{
                    updateScreen('',true);
                    currentNumber = 0;
                    previousNumber = 0;
                    move = "";
                    return;
                }
                break; }
        }
        currentNumber = 0;
        if(nextMove === "="){
            currentNumber = previousNumber;
            previousNumber = 0;
            move = "";
            updateScreen();
            return;
        }
        updateScreen(move);
        move = nextMove;
    }
    
    function updateScreen(curMove = '', err = false){
        if(err){
            screenMemory.text(0);
            screenMain.text("Error");
        }else{
            if(curMove !== ''){
                previousNumber = (parseInt(previousNumber) === previousNumber) ? previousNumber : previousNumber.toFixed(5);
                screenMemory.text(String(previousNumber) + curMove);
            }
            currentNumber = (parseInt(currentNumber) === currentNumber) ? currentNumber : currentNumber.toFixed(5);
            screenMain.text(currentNumber);
        }
    }
});


