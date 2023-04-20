import {TipoEnum} from "@/model/TipoEnum";
import {Fornecedor} from "@/model/Fornecedor";

export class Despesa{
    id;
    tipoDespesa=new TipoEnum();
    fornecedor=new Fornecedor();
    data;
    formaPagamento=new TipoEnum();
    valor;
    obs;

    ajusteFornecedor;
}