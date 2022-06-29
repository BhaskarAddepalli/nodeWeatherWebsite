console.log('client side js loaded...')


// fetch('http://localhost:3000/weather?address=amalapuram').then((response)=>{
   
// response.json().then((data)=>{
// if(data.error){
//  console.log(data.error) 
// }
// else{
// console.log(data);
// }

// })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#mssg1')
//const messageTwo=document.getElementsByClassName('#mssg2')
messageOne.textContent=''
//messageTwo.src=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    console.log('searched location: '+location)
    messageOne.textContent='Loading....'
    //messageTwo.src=''
    if(document.getElementById('icon')){
    document.getElementById('icon').remove()
    }
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
   
response.json().then((data)=>{
if(data.error){
 console.log(data.error) 
 messageOne.textContent=data.error
}
else{
    messageOne.textContent=data.location
   // messageTwo.src='/images/me.jpg'
   let div=document.createElement('img')
   div.src=data.foreCast[0]
   div.className='icon'
   div.id='icon'
   document.querySelector('#ss').appendChild(div);

console.log(data.location);
console.log(data.foreCast[0])
}

})
})
});