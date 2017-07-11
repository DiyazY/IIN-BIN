export default function(value){
    this.val = value;
    return function(value){
        console.log(value);
        return (value);
    }
}