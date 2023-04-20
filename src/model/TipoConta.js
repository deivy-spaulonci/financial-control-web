import {TipoEnum} from "@/model/TipoEnum";

export class TipoConta{
    id;
    nome;
    contaCartao=false;
    tipocontaStadus=new TipoEnum();
}