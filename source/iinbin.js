export const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
};

export default class IinBin{

    constructor(){
        this._value = null;
        this._type = null;
        this._a7 = null;
        this._a5 = null;
        this._isEmpty = (val)=>{
            if(val == null || val === undefined || val ===''){
                return true;
            }
            return false;
        };
    }

    get type(){
        if(this._isEmpty(this._type)) {
            console.warn(`Type doesn't calculated!`);
            return;
        }
        return `${this._type}`.toUpperCase();
    }

    get value(){
        if(this._isEmpty(this._value)) {
            console.warn(`Value doesn't setted!`);
            return;
        }
        return this._value;
    }

    set value(newValue){
        try{
            if (newValue.length != 12) {
                throw new Error('Length should be 12 symbols!');
            }
            if (!(/[0-9]{12}/.test(newValue))) {
                throw new Error('Value should include only numbers!');
            }
            //check control number
            let b1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
            let b2 = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2 ];
            let a = [];
            let controll = 0;
            for(let i=0; i<12; i++){
                a[i] = parseInt(newValue.substring(i, i+1));
                if(i<11) controll += a[i]*b1[i];
            }
            controll = controll % 11;
            if(controll==10) {
                controll = 0;
                for(let i=0; i<11; i++)
                    controll += a[i]*b2[i];
                controll = controll % 11;
            }
            if (controll != a[11]) {
                throw new Error('Invalid control number!');
            }
            this._type =(()=>{
                let checkiinOrBinArray =[0,1,2,3];
                this._a5 = parseInt(newValue.substring(4, 5));
                if(checkiinOrBinArray.indexOf(this._a5)!=-1){
                    return 'iin';
                }
                else return 'bin';
            })();
            this._value = newValue;
            this._a7 = parseInt(newValue.substring(6, 7));
            console.info(`${this._value} is ${this._type}`);
        }
        catch(exception){
            console.error(exception);
        }
    }

    get data(){
        let result = {
            value: this.value,
            type:this.type
        }
        if(this.type ==='IIN'){
            result.gender = this.methods.gender();
            result.birthCentury = this.methods.birthCentury();
            result.registrationNumber = this.methods.registrationNumber();
            result.birthDay = this.methods.birthDay();
            result.birthMonth = this.methods.birthMonth();
            result.birthYear = this.methods.birthYear();
            result.birthDate = this.methods.birthDate();
            return result
        }
        else{
            result.regMonth = this.methods.regMonth();
            result.regYear = this.methods.regYear();
            result.legalEntityType = this.methods.legalEntityType();
            result.legalEntityAttribute = this.methods.legalEntityAttribute();
            return result
        }
    }

    get methods(){
        if(this.type ==='IIN'){
            return{
                //пол
                gender:()=>{
                    let gender = this._a7%2;
                    if(gender == 1) 
                         return 'male';
                    else return 'female';
                },
                //век рождения
                birthCentury:()=>{
                    switch (this._a7) {
                        case 1:
                        case 2: return '19';
                            break;
                        case 3:
                        case 4: return '20';
                            break;
                        case 5:
                        case 6: return '21';
                            break;
                    }
                },
                //номер регистрации
                registrationNumber:()=> {
                    return this._value.substring(7, 10);
                },
                //день рождения
                birthDay:()=> {
                    return this._value.substring(4, 6);
                },
                //год рождения
                birthYear:()=> {
                    let century = this.methods.birthCentury();
                    return parseInt(century-1) * 100 + parseInt(this._value.substring(0, 2));
                },
                //месяц рождения
                birthMonth:()=> {
                    return parseInt(this._value.substring(2, 4));
                },
                //дата рождения
                birthDate:()=> {
                    return new Date(this.methods.birthYear(), this.methods.birthMonth() - 1, this.methods.birthDay());
                },
                //дата рождения(локализация, опции)
                birthDateLocale:(locale, options)=> {
                    let date = this.methods.birthDate();
                    let formatter = new Intl.DateTimeFormat(locale,options);
                    return formatter.format(date);
                }
            }

        }else if(this.type ==='BIN'){
            return{
                //месяц регистрации
                regMonth:()=> {
                    return parseInt(this._value.substring(2, 4));
                },
                //год регистрации
                regYear:()=>{
                    return parseInt(this._value.substring(0, 2));
                },
                //Тип юридического лица
                legalEntityType:()=>{
                    switch (this._a5) {
                        case 4:
                        return 'resident';//для юридических лиц-резидентов
                            break;
                        case 5: return 'non-resident';//для юридических лиц-нерезидентов
                            break;
                        case 6: return 'individual-entrepreneurs';//для индивидуальных предпринимателей, осуществляющих деятельность на основе совместного предпринимательства
                            break;
                        case 7:
                        case 8:
                        case 9: return 'reserved';//резервные значения
                            break;
                    }
                },
                //детализация юридического лица
                legalEntityAttribute:()=>{
                let a6 = parseInt(this._value.substring(5, 6));
                switch (a6) {
                        case 0:
                        return 'head-office';//признак головного подразделения ЮЛ или ИП(С);
                            break;
                        case 1: return 'branch-office';//признак филиала ЮЛ или ИП(С);
                            break;
                        case 2: return 'representative-office';//признак представительства ЮЛ или ИП(С);
                            break;
                        case 3:return 'another-isolated-structural-unit';//признак иного обособленного структурного подразделения ЮЛ или ИП(С);
                            break;
                        case 4: return 'peasant-farming';//признак крестьянского (фермерского) хозяйства, осуществляющего деятельность на основе совместного предпринимательства;
                            break;
                    }
                }
            }

        }
    }
}
