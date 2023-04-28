import {Fornecedor} from "@/model/Fornecedor";

export class LancamentoContaCartao{
    fornecedor=new Fornecedor();
    data;
    valor;
    parcela=0;
    totalParcela=0;
}