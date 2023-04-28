
import {TipoEnum} from "@/model/TipoEnum";
import {TipoConta} from "@/model/TipoConta";

export class Conta{
    id;
    numero;
    codigoBarra;
    tipoConta = new TipoConta();
    emissao;
    vencimento;
    parcela=0;
    totalParcela=0;
    valor;
    formaPagamento = new TipoEnum();
    dataPagamento;
    valorPago;
    cancelado;
    idCancelamento;
    obs;
    lancamentoContaCartao= [];
    status;

}