import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";

export default {
    data() {
        return {
            tipos:[],
            formasPgto:[],
            defaultService: null,
            util:null,
        }
    },
    methods:{
        async getTipos(){
            this.tipos = await this.defaultService.get('tipo-despesa');
            this.formasPgto = await this.defaultService.get('forma-pagamento')
        },
    },
    mounted() {
        this.getTipos();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}