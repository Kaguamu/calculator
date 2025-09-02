const display = document.getElementById("display");
function appendToDisplay(input){
    // Prevent extremely long input
    if(display.value.length > 50) return;
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    const expr = display.value.trim();
    if(!expr) return;

    // Basic sanitation: only allow digits, operators, parentheses, decimal and spaces
    if(!/^[0-9+\-*/().\s]+$/.test(expr)){
        display.value = "Error";
        return;
    }

    try{
        if(expr.length > 100) { display.value = "Error"; return; }

        // eslint-disable-next-line no-new-func
        const result = Function('"use strict"; return (' + expr + ')')();
        display.value = String(result);
    }
    catch(error){
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Allow numbers, operators and Enter/Escape/Backspace
    if(/[0-9+\-*/().]/.test(key)){
        appendToDisplay(key);
        e.preventDefault();
        return;
    }

    if(key === "Enter" || key === "="){
        e.preventDefault();
        calculate();
        return;
    }

    if(key === "Backspace"){
        // remove last char
        display.value = display.value.slice(0, -1);
        e.preventDefault();
        return;
    }

    if(key === "Escape" || key.toLowerCase() === "c"){
        clearDisplay();
        e.preventDefault();
        return;
    }
});

   
