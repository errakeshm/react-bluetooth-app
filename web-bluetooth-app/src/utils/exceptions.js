export class ApplicationException {
    constructor(code, message){
        this.code = code;
        this.message  = message;
    }
    getErrorMessage(){
        return this.message;
    }
    getErrorCode(){
        return this.code;
    }
}