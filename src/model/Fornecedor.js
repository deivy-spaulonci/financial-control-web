import {Cidade} from "@/model/Cidade";

export class Fornecedor{
    id;
    nome;
    razaoSocial;
    cnpj;
    cidade=new Cidade();
}