export interface Produto {
    id_produto: number;
    id_cliente: number;
    descricao: string;
    genero: string;
    faixaEtaria: string;
    preço: number;
    dataDeCadastro: Date;
    estado: string
  }