import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Fieldset from 'primevue/fieldset';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import ContextMenu from 'primevue/contextmenu';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';

import 'primevue/resources/themes/nano/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'
import './assets/main.css'
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Button', Button);
app.component('TabMenu', TabMenu);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Panel', Panel);
app.component('Paginator', Paginator);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);
app.component('Fieldset', Fieldset);
app.component('InputMask', InputMask);
app.component('Card', Card);
app.component('Chart', Chart);
app.component('Message', Message);
app.component('InlineMessage', InlineMessage);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Divider', Divider);
app.component('Toast', Toast);
app.component('ContextMenu', ContextMenu);
app.component('FileUpload', FileUpload);
app.component('Dialog', Dialog);
app.directive('tooltip', Tooltip);
app.directive('focustrap', FocusTrap);

app.mount('#app')