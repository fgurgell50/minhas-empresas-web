class ValidaCnpjCpf{


    static validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false; // CPF com 11 dígitos iguais é inválido
        }
        
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }

    static validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
            return false; // CNPJ com 14 dígitos iguais é inválido
        }
        
        const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesosPrimeiroDigito[i];
        }
        
        let resto = soma % 11;
        let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) return false;
        
        const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        soma = 0;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesosSegundoDigito[i];
        }
        
        resto = soma % 11;
        let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) return false;
        
        return true;
    }



}
export default ValidaCnpjCpf