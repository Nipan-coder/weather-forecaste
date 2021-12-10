const timeEl= document.getElementById('time');
const monthEl= document.getElementById('month');
const weekdayEl= document.getElementById('weekday');
const tempEl= document.getElementById('temp');
const countryEl= document.getElementById('country-zone');
const fiveDayElement= document.getElementById("fiveday");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = '4caff178f82066088df8989f85d0240e';

const getWeatherData = async () => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=be54106484a670d36ecd3ebbd14ed34e`)
    const data = await res.json();
    showWeatherData(data);
};

const showWeatherData = (data) => {
    const currentTime = ((new Date().getHours()) / 3) - 4;
    countryEl.innerText = `${data.city.name}, ${data.city.country}`;    
    let daysAndData = [];
    for (let i = 0; i < data.list.length ; i += 8) {
        temp = data.list.slice(i, i + 8);
        daysAndData.push(temp)
    }
    daysAndData.forEach((dayData, index) => {
        console.log(dayData)
        const day = document.createElement("div");
        day.setAttribute("class", "day")
        day.innerHTML = `<h4 class="weekday"> ${days[new Date(dayData[0].dt_txt).getDay()]}</h4>`;

        const dateAndTime = document.createElement("div");

        const month = document.createElement("span");
        month.innerText = months[new Date(dayData[0].dt_txt).getMonth()];
        const date = document.createElement("span");
        date.innerText = new Date(dayData[0].dt_txt).getDate();
        const time = document.createElement("span");
        time.innerText = `${new Date(dayData[0].dt_txt).getHours()}: ${(new Date(dayData[0].dt_txt).getMinutes()) >= 10 ? new Date(dayData[0].dt_txt).getMinutes() : "0" + new Date(dayData[0].dt_txt).getMinutes() }`
        dateAndTime.appendChild(month);
        dateAndTime.appendChild(date);
        dateAndTime.appendChild(time);
        
        const temp = document.createElement("h3");
        temp.setAttribute("class", "temp");
        temp.innerHTML = `${parseFloat((dayData[Math.floor(currentTime)].main.temp) - 273.15).toFixed(2)}℃`;
        const description = document.createElement("div");
        description.setAttribute("class", "status");
        description.innerText = dayData[Math.floor(currentTime)].weather[0].description;
        const icon = document.createElement("img");
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${dayData[Math.floor(currentTime)].weather[0].icon}@2x.png`);

        day.appendChild(dateAndTime);
        day.appendChild(icon);
        day.appendChild(temp);
        day.appendChild(description);
        
        fiveDayElement.appendChild(day);
    })
}

getWeatherData();