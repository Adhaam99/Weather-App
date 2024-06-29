const cDay = document.querySelector("#cDay")
const cDate = document.querySelector("#cDate")
const area = document.querySelector("#location")
const cNum = document.querySelector("#cNum")
const cIcon = document.querySelector("#cIcon")
const custom1 = document.querySelector("#custom1")
const day2 = document.querySelector("#day2")
const icon2 = document.querySelector("#icon2")
const num2 = document.querySelector("#num2")
const small2 = document.querySelector("#small2")
const custom2 = document.querySelector("#custom2")
const day3 = document.querySelector("#day3")
const icon3 = document.querySelector("#icon3")
const num3 = document.querySelector("#num3")
const small3 = document.querySelector("#small3")
const custom3 = document.querySelector("#custom3")
const search = document.querySelector("#search")
const findBtn=document.querySelector("#find")



async function weatherApi(city) {

    let http = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c25ce22b284d4f8085e130554242006&q=${city}&days=3`)
    let res = await http.json()

    return res

        

}

async function weatherDisplay(city = "cairo"){

    let result= await weatherApi(city)

    currentday(result)
    nextDay2(result)
    nextDay3(result)

}

weatherDisplay()


function currentday(data) {

    let currentDay=new Date()
    cDay.innerHTML = currentDay.toLocaleDateString("en-us",{weekday:"long"})
    cDate.innerHTML = currentDay.getDate()+currentDay.toLocaleDateString("en-us",{month:"short"})
    area.innerHTML = data.location.name
    cNum.innerHTML = `${data.current.temp_c}<sup>o</sup>C`
    cIcon.setAttribute("src", `https:${data.current.condition.icon}`)
    custom1.innerHTML = data.current.condition.text
  
    


}

function nextDay2(data){

    let nextDayDate=new Date(data.forecast.forecastday[1].date)
    day2.innerHTML = nextDayDate.toLocaleDateString("en-us",{weekday:"long"})
    icon2.setAttribute("src", `https:${data.forecast.forecastday[1].day.condition.icon}`)
    num2.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`
    small2.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`
    custom2.innerHTML = data.forecast.forecastday[1].day.condition.text

}

function nextDay3(data){

    let nextDayDate=new Date(data.forecast.forecastday[2].date)
    day3.innerHTML = nextDayDate.toLocaleDateString("en-us",{weekday:"long"})    
    icon3.setAttribute("src", `https:${data.forecast.forecastday[2].day.condition.icon}`)
    num3.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`
    small3.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`
    custom3.innerHTML = data.forecast.forecastday[2].day.condition.text

}

search.addEventListener("input",function(){

    weatherDisplay(search.value)
    
})


findBtn.addEventListener("click",function(){

    navigator.geolocation.getCurrentPosition(success)

    function success(pos){

        let position=pos.coords

        console.log(position.latitude);

        weatherDisplay(`${position.latitude},${position.longitude}`)
    }

    success()
})

document.querySelector("form").addEventListener("submit",function(e){

    e.preventDefault()
})



