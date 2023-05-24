import {Fornecedor} from "@/model/Fornecedor";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import AutoCompleteCidade from "@/components/form/AutoCompleteCidade.vue";
import {Cidade} from "@/model/Cidade";

export default {
    name: "FornecedorForm",
    components: {AutoCompleteCidade},
    data() {
        return {
            fornecedorCadastro:new Fornecedor(),
            defaultService: null,
            util:null,
        }
    },
    methods:{
        setEditfornecedor(fornecedor){
            this.fornecedorCadastro = fornecedor;
        },
        async cadastroFornecedor(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');

            await this.defaultService.post('fornecedor',this.fornecedorCadastro);
            this.$emit('refreshListFornecedor');
            this.fornecedorCadastro = new Fornecedor();
            this.fornecedorCadastro.cidade = new Cidade();
        },
        async getCnpj(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/\D/g, '');

            let result = await this.defaultService.get('fornecedor/consultacnpj?cnpj='+this.fornecedorCadastro.cnpj);
            if(result.status=="ERROR"){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:result.message, life: 3000});
            }else{
                this.fornecedorCadastro.nome = this.util.capt(result.fantasia ? result.fantasia : result.nome);
                this.fornecedorCadastro.razaoSocial = this.util.capt(result.nome ? result.nome : result.fantasia);
                this.fornecedorCadastro.cidade = new Cidade();
                this.fornecedorCadastro.cidade.nome = result.municipio.toLowerCase();
                // this.cidades = this.cidadesDb.filter((e) =>
                //     e.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()==result.municipio.toLocaleLowerCase()
                // );

            }
        }
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    mounted() {
    },
}