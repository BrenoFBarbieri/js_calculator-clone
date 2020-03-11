class CalcController {

    constructor() {
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayClacEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }
    
    // Metedo para rodar data e hora no display
    initialize(){
        this.setDisplayTime();

        setInterval(() => { 

            this.setDisplayTime();

        }, 1000);

        this.setLastNumberToDisplay();
    }
    
    // Metedo criado para ler diversos eventos e formatar com o split para função
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        });
    }
    
    // Para zerar o array (zerar todos as informações salvas)
    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }
    
    // Para excluir a ultima operação (ultimo item do array)
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    // Para pegar o ultimo operador
    getlastOperation() {
        
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1); 
    }
    
    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();
        }
    }

    getResult () {

        return eval(this._operation.join(""));
    }

    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }


        if (this._operation.length > 3) {
            
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        
        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

        console.log('_lastOperator', this._lastOperator);
        console.log('_lastNumber', this._lastNumber);

        let result = this.getResult();

        if (last == '%') {
            
            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last ) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        
        this.lastItem;

        for (let i = this._operation.length-1; i >= 0; i--) {
            
            if (this.isOperator(this._operation[i]) == isOperator) {
                this.lastItem = this._operation[i];
                break;
            }
        }
        return this.lastItem;
    }

    setLastNumberToDisplay() {

        this.lastNumber = this.getLastItem(false);

        if(!this.lastNumber) this.lastNumber = 0;

        this.displayCalc = this.lastNumber;
    }

    // Para adicionar no array
    addOperation(value) {
        
        if (isNaN(this.getlastOperation())){
           
            // Se for String
            if (this.isOperator(value)) {
                // Trocar o operador
                this.setLastOperation(value);
            
            } else if (isNaN(value)) {
                
                console.log('Outra coisa', value);
            
            } else {
                // Adiciona o item ao array
                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }
        
        } else {
            // Se for Number

            if (this.isOperator(value)) {
                // Se for um operador
                this.pushOperation(value);

            } else {

                let newValue = this.getlastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                // Atualizar display
                this.setLastNumberToDisplay();
            }
        }
    }


    // Retorna "error" no display
    setError() {
        this.displayCalc = "Error";
    }
    
    // Le uma ação e executa um metedo
    execBtn(value) {

        switch (value) {

            case 'ac':
                
                this.clearAll();
                break;
            case 'ce':
                
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
                default:
                this.setError();
                break;
        }
    }
    
    // Metedo para ler os eventos nos botões
    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            // Le os click nos botões do usuario e salva removendo o "btn-"
            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });
            // Le os eventos do usuarios para mudar o cursor para uma mão
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });

    }
    
    // Metedo para data e hora
    setDisplayTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    
    get displayTime() {
        return this._timeEl.innerHTML;
    }
    
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayClacEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayClacEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}