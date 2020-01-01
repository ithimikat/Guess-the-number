const NUMBER = parseInt(Math.random() * (101 - 1) + 1);
let attempts = 10;

// Если поле ввода не пустое и span с ошибкой еще не существует создаем span
function createErrorMessage(number) {

    let errorMessage = document.querySelector('.error-message');

    if (!isNaN(number) && errorMessage === null) {

        let input = document.querySelector('input');
        let span = document.createElement('span');

        span.setAttribute('class', 'error-message');
        span.textContent = 'число должно быть от 1 до 100';
        input.after(span);
    }
}

// Проверка числа на диапазон от 1 до 100
function rangeCheck(number) {

    let errorMessage = document.querySelector('.error-message');
    number = parseInt(number);

    // Если число в допустимом диапазоне
    if (number > 0 && number <= 100) {

        if (errorMessage != null) {
            errorMessage.remove();
        }

        return true;
    }

    createErrorMessage(number);
    return false;
}

// Удаление всего DOM дерева и добавление сообщения
// о выиграше или проиграше
function endGame(text){

    let container = document.querySelector('.container');
    container.innerHTML = '';

    let message = document.createElement('h1');
    message.innerText = text;
    message.setAttribute('style', 'margin-top: 210px');

    let button = document.createElement('button');
    button.setAttribute('style', 'width: 200px; height: 50px; font-size: 20px');
    button.innerText = "Сыграть еще раз";

    container.append(message);
    container.append(button);
    
    document.querySelector('button').onclick = () => location.reload();
}

// Уменьшение на одну попытку
function fewerAttempts() {

    --attempts;

    if(attempts === 0){
        endGame('Вы прогирали!!!');
    }
    else{
        document.querySelector('h2 > span').innerHTML = attempts;
    }
}

// Функция проверки введенного числа с загаданным
function numberCheck() {

    let userNumber = document.querySelector('input').value;
    userNumber = parseInt(userNumber);

    if (!rangeCheck(userNumber)) return false;

    let textHint = document.querySelector('h3 > span');
    let hint = document.querySelector('h3');

    if(!isNaN(userNumber)){
        hint.removeAttribute('hidden');
    }

    if (userNumber < NUMBER) {
        textHint.innerText = 'число больше';
    }
    else if (userNumber > NUMBER) {
        textHint.innerText = 'число меньше';
    }
    else{
        endGame('Вы выиграли!!!');
    }

    fewerAttempts();
}

let buttonCheck = document.querySelector('button');

buttonCheck.onclick = numberCheck;