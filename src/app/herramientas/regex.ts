export class Regex{

    constructor(){}

    validarSoloNumeros(tamanioCadena?: number):string{
        let regex = "";
        if(tamanioCadena)
            regex = "^[\\d]{"+tamanioCadena+"}";
        else
            regex = "^[\\d]+";
        return regex;
    }

    validarNombre():string{
        let regex = "^[a-zA-Z-ÁÉÍÓÚñáéíóúÑ]+[\\s]?([a-zA-Z-ÁÉÍÓÚñáéíóúÑ]+[\\s]?)*";
        return regex;
    }

    validarAlfanumericos():string{
        let regex = "^[a-zA-Z-ÁÉÍÓÚñáéíóúÑ0-9]+[\\s]?([a-zA-Z-ÁÉÍÓÚñáéíóúÑ0-9]+[\\s]?)*";
        return regex;
    }

    validarCurp():string{
        let regex = "^[a-zA-Z]{4}[\\d]{6}[a-zA-Z]{6}[\\d]{2}";
        return regex;
    }

    validarRfc():string{
        let regex = "[a-zA-Z]{4}[\\d]{6}([a-zA-Z0-9]{3})?";
        return regex;
    }

    validarTel():string{
        let regex = "([\\d]+([\\s]|[-])?)+";
        return regex;
    }

    validarClaveIne():string{
        let regex = "^[a-zA-Z]{6}[\\d]{8}[a-zA-Z][\\d]{3}";
        return regex;
    }

    validarAnioRegistro():string{
        let regex = "^[\\d]+[\\s]?([\\d]+[\\s]?)*";
        return regex;
    }

    validarMail():string{
        let regex = "^[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.a-zA-Z]+";
        return regex;
    }
}