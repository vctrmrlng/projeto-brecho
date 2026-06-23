export interface Produto {
    id_produto: number;
    id_cliente: number;
    descricao: string;
    genero: string;
    faixaEtaria: string;
    preco: number;
    dataDeCadastro: Date;
    estado: string;
    tamanho: string
    imagemPrincipal: string
  }