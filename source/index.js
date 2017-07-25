import iinbinFunc,{options} from './iinbin';

let iinbin = new iinbinFunc();
iinbin.type;
iinbin.value;
iinbin.methods;
iinbin.value=document.getElementById('iin').value = '901123300258';//this is my valid iin

console.log(iinbin.type);

document.getElementById('iin').onchange=(e)=>{  
    iinbin.value = e.target.value;
}

document.getElementById('value').onclick=()=>console.info(iinbin.value);
document.getElementById('get-type').onclick=()=>console.info(iinbin.type);
document.getElementById('results').onclick=()=>{
    console.log('<---------------------------------------------------------------------->')
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
        console.dir(iinbin.data);
    }
    if (iinbin.type==='BIN'){
        console.info(`regMonth: ${iinbin.methods.regMonth()}`);
        console.info(`regYear: ${iinbin.methods.regYear()}`);
        console.info(`legalEntityType: ${iinbin.methods.legalEntityType()}`);

        console.info(`legalEntityAttribute: ${iinbin.methods.legalEntityAttribute()}`);
        console.dir(iinbin.data);
    }

}
console.dir(iinbin.methods);
document.getElementById('results').onclick();





