import { createI18n } from "vue3-i18n";

import en from "./englishLanguage";
import es from "./spanishLanguage";
import pt from "./portugueseLanguage";

const i18n = createI18n({
    locale: "en",
    messages: {
        en,
        es,
        pt,
    },
});

export default i18n;


