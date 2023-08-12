class CepService {
    constructor() {
      this.apiUrl = 'http://cep.la/api/';
    }
    async validarCep(cep) {

      try {
        const response = await fetch(`${this.apiUrl}${cep}`, {  
          method: 'GET',
        });
  
        if (response.statusCode() === 200) {
          //throw new Error('Erro ao validar o CEP');
            return true
        }else{
            return false
        } 
        }catch (error) {
            console.error('Erro ao validar o CEP:', error);
            return false;
        }
    }
}    
  export default CepService;
  