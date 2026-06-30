export interface LoginResponse {
  autenticado: boolean;
  token: string;
  clienteId: number;
  nome: string;
  email: string;
}