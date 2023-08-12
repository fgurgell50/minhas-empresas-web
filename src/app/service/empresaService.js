import ApiService from '../apiservice'

class EmpresaService extends ApiService {
  constructor() {
    super('api/empresa');
  }

  carregarListaEmpresas() {
    return this.get('')
      .then(response => {
        const empresas = response.data.map(empresa => ({
          label: empresa.nome_fantasia, // Use o nome da empresa ou outro campo apropriado
          value: empresa.empresa_id, // Use o ID da empresa ou outro campo apropriado
        }));
        empresas.unshift({ label: 'Selecione a Empresa...', value: '' });
        return empresas;
      })
      .catch(error => {
        throw new Error('Erro ao carregar a lista de empresas');
      });
  }

  autenticar(credenciais) {
    return this.post('/autenticar', credenciais);
  }

  obterSaldoPoUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  salvar(empresa) {
    return this.post('', empresa);
  }
}

export default EmpresaService;
