class CalcController {

    constructor() {
        
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
    }
    // Para excluir a ultima operação (ultimo item do array)
    clearEntry(){
        this._operation.pop();
    }
    // Para adicionar no array
    addOperation(value) {
        this._operation.push(value);
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
                this.clearAll();
                break;
            case 'subtracao':
                this.clearAll();
                break;
            case 'divisao':
                this.clearAll();
                break;
            case 'multiplicacao':
                this.clearAll();
                break;
            case 'porcento':
                this.clearAll();
                break;
            case 'igual':
                this.clearAll();
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
            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn();
            });

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