import iinbinFunc,{options} from './iinbin';

let iinbin = new iinbinFunc();
iinbin.type;
iinbin.value;
iinbin.methods;
iinbin.value=document.getElementById('iin').value = '901123300258';
console.log(iinbin.type);
document.getElementById('iin').onchange=(e)=>{  
    iinbin.value = e.target.value;
}

document.getElementById('value').onclick=()=>console.info(iinbin.value);
document.getElementById('get-type').onclick=()=>console.info(iinbin.type);
console.dir(iinbin.methods);
console.info(iinbin.methods.gender());
console.info(iinbin.methods.registrationNumber());

console.info(iinbin.methods.birthCentury());

console.info(iinbin.methods.birthDay());
console.info(iinbin.methods.birthMonth());
console.info(iinbin.methods.birthYear());

console.info(iinbin.methods.birthDate());
console.info(iinbin.methods.birthDateLocale('ru',options));
console.info(iinbin.methods.birthDateLocale('kz',options));
console.info(iinbin.methods.birthDateLocale('en',options));




