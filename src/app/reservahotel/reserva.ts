export interface Reserva {
    codReserva: number
    codEmpresa: number;
    dataReserva: string;
    codUsuario: number;
    tipoQuarto: string;
    nomeUsuarioReserva: string;    
    nomeEmpresaReserva: string;
    urlRedirecionamento: string;
    urlPagamento: string;
}