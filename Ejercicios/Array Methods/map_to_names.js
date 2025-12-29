let john = {name:"john",age:56};
let pepe = {name:"pepe",age:54};
let agus = {name:"agus",age:44};
let users = [john,pepe,agus]
function nombres(users){
    return users.name
}
let names = users.map(nombres)
console.log(names)