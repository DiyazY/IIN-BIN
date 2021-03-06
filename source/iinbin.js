export const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
};

export default class IinBin{

    constructor(){
        this._value , 
        this._type, 
        this._seventhNumber,
        this._seventhNumber,
        this._fifthNumber = null;

        this._array = [];
        this._isEmpty = (val)=> !(val || false);
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
            if (newValue.length !== 12) 
                throw new Error('Length should be 12 symbols!');
            if (!(/[0-9]{12}/.test(newValue)))
                throw new Error('Value should include only numbers!');
            //check control number
            let firstControlSet = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
            let secondControlSet = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2 ];
            let controll = 0;
            this._array = Array.from(newValue).map((el,i)=>{
                if(i<11) controll += el*firstControlSet[i];
                return parseInt(el)
            })
            controll = controll % 11;
            if(controll===10) {
                controll = 0;
                this._array.map((el,i)=>controll += el*secondControlSet[i])
                controll = controll % 11;
            }
            if (controll !== this._array[11]) {
                throw new Error('Invalid control number!');
            }
            this._type =(()=>{
                    let checkiinOrBinArray =[0,1,2,3];
                    this._fifthNumber = this._array[4]
                    return checkiinOrBinArray.indexOf(this._fifthNumber)!==-1?'iin':'bin';
                })();
            this._value = newValue;
            this._seventhNumber = this._array[6]
            console.info(`${this._value} is ${this._type}`);
        }
        catch(exception){
            console.error(exception);
        }
    }

    get data(){
        const result = {
            value: this.value,
            type:this.type
        }
        const methods = this.methods;
        if(this.type ==='IIN'){
            return {
                ...result,
                gender:methods.gender(),
                birthCentury:methods.birthCentury(),
                registrationNumber:methods.registrationNumber(),
                birthDay:methods.birthDay(),
                birthMonth:methods.birthMonth(),
                birthYear:methods.birthYear(),
                birthDate:methods.birthDate()
            }
        }
        else if(this.type ==='BIN'){
            return {
                ...result,
                regMonth : methods.regMonth(),
                regYear : methods.regYear(),
                legalEntityType : methods.legalEntityType(),
                legalEntityAttribute : methods.legalEntityAttribute()
            }
        }
    }

    get methods(){
        if(this.type ==='IIN'){
            return{
                //пол
                gender:()=> this._seventhNumber%2 == 1 ?'male':'female',
                //век рождения
                birthCentury:()=>{
                    switch (this._seventhNumber) {
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
                registrationNumber:()=> this._value.substring(7, 10),
                //день рождения
                birthDay:()=> this._value.substring(4, 6),
                //год рождения
                birthYear:()=> {
                    let century = this.methods.birthCentury();
                    return parseInt(century-1) * 100 + parseInt(this._value.substring(0, 2));
                },
                //месяц рождения
                birthMonth:()=> parseInt(this._value.substring(2, 4)),
                //дата рождения
                birthDate:()=> new Date(Date.UTC(this.methods.birthYear(), this.methods.birthMonth() - 1, this.methods.birthDay())),
                //дата рождения(локализация, опции)
                birthDateLocale:(locale, options)=> {
                    let date = this.methods.birthDate();
                    let formatter = new Intl.DateTimeFormat(locale,options);
                    return formatter.format(date);
                }
            }

        } 
        else if(this.type ==='BIN'){
            return{
                //месяц регистрации
                regMonth:()=> parseInt(this._value.substring(2, 4)),
                //год регистрации
                regYear:()=> parseInt(this._value.substring(0, 2)),
                //Тип юридического лица
                legalEntityType:()=>{
                    switch (this._fifthNumber) {
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
                    let sixthNumber = parseInt(this._array[5]);
                    switch (sixthNumber) {
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
