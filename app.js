const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const country = document.querySelector('.country')
const timezone = document.querySelector('.timezone')
const population = document.querySelector('.population')
const forecastLow = document.querySelector('.forecast_low')
const forecastHigh = document.querySelector('.forecast_high')
const img = document.querySelector('img')
const main = document.querySelector('main')
const input = document.querySelector('input')
const searchBtn = document.querySelector('button')
const body = document.querySelector('body')
const title = document.querySelector('.title')
const table = document.querySelector('table')




    async function getCityByName(city){
        try{
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
            const data = await res.json()
            console.log(res)
            console.log(data)
            return data.results[0]
        }
        catch(error){
            console.log("error")
        }
    }

    async function getWeatherByCity(latitude,longitude){
        try{
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
            const data = await res.json()
            console.log(data)
            return data
        }
        catch(error){
            console.log("error")
        }
    }



async function buildTable(postCity ,postWeather){
    city.innerHTML = `${postCity.name}`
    temp.innerHTML = `${postWeather.current.temperature_2m} ${postWeather.current_units.temperature_2m}`
    country.innerHTML = `${postCity.country}`
    timezone.innerHTML = `${postCity.timezone}`
    population.innerHTML =`${postCity.population}`
    forecastLow.innerHTML = `Low: ${postWeather.daily.temperature_2m_max}`
    forecastHigh.innerHTML = `High: ${postWeather.daily.temperature_2m_min}`
}


searchBtn.addEventListener('click', async() =>{

    const postCity = await getCityByName(input.value)
    console.log(input.value)
    console.log(postCity)
    const postWeather = await getWeatherByCity(postCity.latitude, postCity.longitude)
    console.log(postWeather)
    buildTable(postCity ,postWeather)

    if (postWeather.current.is_day === 1){
        main.classList.remove('night_time')
        main.classList.add('day_time')
        main.style.color="Black"
        img.src = "./images/day.jpg"
    }else{
        main.classList.remove('day_time')
        main.classList.add('night_time')
        main.style.color="#FFFF"
        img.src = "./images/night.jpg"

    }

    title.style.display ='flex'
    table.style.display ='flex'
    })


