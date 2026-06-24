export interface Produto {
    id_produto: number;
    id_cliente: number;
    descricao: string;
    genero: string;
    faixaEtaria: number;
    preco: number;
    dataDeCadastro: Date;
    estado: string;
    tamanho: string
    imagem: string
  }