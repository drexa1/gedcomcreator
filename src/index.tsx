import ReactDOM from 'react-dom/client';
import App from './app';
import './assets/styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import messages_es from './i18n/literals/es.json';
import messages_pl from './i18n/literals/pl.json';
import resources_es from "./i18n/resources/es.json";
import resources_pl from "./i18n/resources/pl.json";
import {IntlProvider} from "react-intl";

const messages = {
    es: messages_es,
    pl: messages_pl
};
const resources = {
    es: resources_es,
    pl: resources_pl
};

const language = navigator.language && navigator.language.split(/[-_]/)[0];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <IntlProvider locale={language} messages={messages[language]}>
        <App/>
    </IntlProvider>
);
export default language