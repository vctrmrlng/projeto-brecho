export interface Produto {
  id: number;
  clienteId: number;
  descricao: string;
  genero: string;
  faixaEtaria: number;
  preco: number;
  dataDeCadastro: string;
  status: number;
  tamanho: string;
  imagem: string;
}
