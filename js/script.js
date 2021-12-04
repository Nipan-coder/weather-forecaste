const timeEl= document.getElementById('time');
const monthEl= document.getElementById('month');
const weekdayEl= document.getElementById('weekday');
const tempEl= document.getElementById('temp');
const countryEl= document.getElementsByClassName('country-zone');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY ='4caff178f82066088df8989f85d0240e';

setInterval(()=>{
    const time =new Date();
    const month= time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const otherformat= hour >= 13 ? hour %12: hour
    const munite = time.getMinutes();
    const ampm= hour >= 12?  'PM' : 'AM'

   
    timeEl.innerHTML = (otherformat < 10? '0'+otherformat : otherformat) + ': ' + (munite < 10? '0'+munite: munite)+ ' ' + `<span id="am-pm">${ampm}</span>`

    monthEl.innerHTML =  date+ ' ' + months[month] +', '
    weekdayEl.innerHTML = `<h4 id=weekday>${days[day]}</h4>`
    
},1000)

    getWeatherData()
function getWeatherData () {

    navigator.geolocation.getCurrentPosition((success) => {
    
    
        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=be54106484a670d36ecd3ebbd14ed34e`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}
    


    
    function showWeatherData () {

    }
