// setTimeout(function(){
//     console.log('3 seconds have passed')
// }, 3000);

// var time = 0;

// var timer = setInterval(function(){
//     time+=2;
//     console.log(time + ' seconds have passed');
//     if(time > 5){
//         clearInterval(timer);
//     }
// },2000);

//FUNCTIONS------------------------------------------------------------

//normal function

// function sayHi(){
//     console.log('hi');
// }

// sayHi();


function callFunction(fun){
    fun();
}

//function Expression

var sayBye = function(){
    console.log('bye');
}

callFunction(sayBye);