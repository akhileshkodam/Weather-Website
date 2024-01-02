let form=document.getElementById('form');
let input=document.getElementById("input");
let result=document.querySelector('.result');
let Name=document.createElement('h2');
let time=document.createElement('p');
let img=document.createElement('img');
let temp=document.createElement('h4');
let hum=document.createElement('h4');
let wind=document.createElement('h4');
let error=document.createElement('h5');
let c=0,d=0;

input.onclick=function () {
    if(c!=0){
        result.removeChild(error);
        c=0;
       
    }
    if(d!=0){
        result.removeChild(Name);
        result.removeChild(time);
        result.removeChild(img);
        result.removeChild(temp);
        result.removeChild(hum);
        result.removeChild(wind);
        d=0;
      
    }
}


const Result = (data) =>{
     
    d++;
    Name.innerHTML=`${data.name}, ${data.sys.country}`;
    Name.classList='text-light mt-3';
    result.appendChild(Name);

    
    time.className='text-light';
    time.innerHTML=`TimeZone: ${data.timezone}`;
    result.appendChild(time);

    
    img.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    result.appendChild(img)

    
    temp.innerHTML=`Temp      : ${data.main.temp}`;
    temp.className='text-light';
    result.appendChild(temp);
    
    hum.innerHTML=`Humidity  : ${data.main.humidity}%`;
    hum.className='text-light';
    result.appendChild(hum);

    
    wind.innerHTML=`Wind Speed  : ${data.wind.speed} Km/h`;
    wind.className='text-light';
    result.appendChild(wind);

    input.value="";

    if(c!=0){
        result.removeChild(error);
        c=0;
    }
 }


const  Weather = async (city)=>{
    try{
    let Json=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb6f44e3b725bf0edd059c159c11f4f2`);
    let data= await Json.json();
    console.log(data);
    Result(data);
    }
    catch{
        c++;
        error.innerHTML=`City Not Found`;
        error.classList='my-3 text-light';
        result.appendChild(error);
        input.value="";

        if(d!=0){
            result.removeChild(Name);
            result.removeChild(time);
            result.removeChild(img);
            result.removeChild(temp);
            result.removeChild(hum);
            result.removeChild(wind);
            d=0;
        }

        
    }
}


form.addEventListener('submit',(e) =>{
    e.preventDefault();
    let city=input.value;
    Weather(city);
    
   
})
