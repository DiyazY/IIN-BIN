export default function(value){
    return function(value){
        console.log(value);
        return (<p>value</p>);
    }
}