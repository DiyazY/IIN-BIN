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
                let a5 = parseInt(newValue.substring(4, 5));
                if(checkiinOrBinArray.indexOf(a5)!=-1){
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

    get methods(){
        if(this.type ==='IIN'){
            return{
                gender:()=>{
                    let gender = this._a7%2;
                    if(gender == 1) 
                         return 'male';
                    else return 'female';
                },
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
                registrationNumber:()=> {
                    return parseInt(this._value.substring(7, 10));
                },
                birthDay:()=> {
                    return this._value.substring(4, 6);
                },
                birthYear:()=> {
                    let century = this.methods.birthCentury();
                    return parseInt(century-1) * 100 + parseInt(this._value.substring(0, 2));
                },
                birthMonth:()=> {
                    return parseInt(this._value.substring(2, 4));
                },
                birthDate:()=> {
                    return new Date(this.methods.birthYear(), this.methods.birthMonth() - 1, this.methods.birthDay());
                },
                birthDateLocale:(locale, options)=> {
                    let date = this.methods.birthDate();
                    let formatter = new Intl.DateTimeFormat(locale,options);
                    return formatter.format(date);
                }
            }

        }else if(this.type ==='BIN'){
            return{
                
            }

        }
    }
}
