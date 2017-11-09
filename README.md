# IIN-BIN
Файл-утилита для верификации ИИН/БИН и добыча данных из 12 цифр)

[DEMO](http://iinbin.dyinc.kz/)

Что такое [ИИН/БИН](https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D0%B8%D0%B2%D0%B8%D0%B4%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80)


## Build It Yourself/Run the Demos
Build: `npm install && npm run build`

Demos: `npm install && npm start`

## Init and usage

```js
import iinbinFunc,{options} from './iinbin';

let iinbin = new iinbinFunc();
iinbin.value = '901123300254';

iinbin.type;
iinbin.value;
iinbin.methods;

if (iinbin.type==='IIN'){
        console.info(`gender: ${iinbin.methods.gender()}`);
        console.info(`registrationNumber: ${iinbin.methods.registrationNumber()}`);
        console.info(`birthCentury: ${iinbin.methods.birthCentury()}`);

        console.info(`birthDay: ${iinbin.methods.birthDay()}`);
        console.info(`birthMonth: ${iinbin.methods.birthMonth()}`);
        console.info(`birthYear: ${iinbin.methods.birthYear()}`);

        console.info(`birthDate: ${iinbin.methods.birthDate()}`);
        console.info(`birthDateLocale-ru: ${iinbin.methods.birthDateLocale('ru',options)}`);
        console.info(`birthDateLocale-kz: ${iinbin.methods.birthDateLocale('kz',options)}`);
        console.info(`birthDateLocale-en: ${iinbin.methods.birthDateLocale('en',options)}`);     
}
if (iinbin.type==='BIN'){
    console.info(`regMonth: ${iinbin.methods.regMonth()}`);
    console.info(`regYear: ${iinbin.methods.regYear()}`);
    console.info(`legalEntityType: ${iinbin.methods.legalEntityType()}`);

    console.info(`legalEntityAttribute: ${iinbin.methods.legalEntityAttribute()}`);
    console.dir(iinbin.data);
}

console.dir(iinbin.data);
console.dir(iinbin.methods);

```


## View Page

[View Page](https://diyazy.github.io/IIN-BIN/)