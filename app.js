window.addEventListener('load', () => {

    let loading = document.querySelector(".loadingio-spinner-double-ring-45eqw20d2bx");
    function showLoading() {
        loading.classList.add("show");
    }

    function hideLoading() {
        loading.classList.remove("show");
    }

    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Latitude and Longitude values
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // Required html tags: 
            let locationTimezone = document.querySelector(".location-timezone");
            let temperatureDegree = document.querySelector(".degree");
            let temperatureDescription = document.querySelector(".temperature-description");
            let iconContainer = document.querySelector(".icon-container");
            let degreeSection = document.querySelector(".degree-section");
            let degreeSpan = degreeSection.childNodes[3];

            // API key for weatherapi.com
            let apiKey = "b26ed06de6a64988b24111205202209";
            let weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;

            showLoading();
            fetch(weatherApi)
                .then(Response => Response.json())
                .then(data => {
                    const location = data.location.name;
                    const temp = [data.current.feelslike_c, data.current.feelslike_f];
                    const description = data.current.condition.text;
                    const icon = data.current.condition.icon

                    // hide loading animation
                    hideLoading();

                    // Assing data to dom
                    locationTimezone.textContent = location;
                    temperatureDegree.textContent = temp[0];
                    degreeSpan.textContent = "°C";
                    temperatureDescription.textContent = description;
                    iconContainer.src = icon;

                    // celcius and farenhite toggler event listner
                    degreeSection.addEventListener('click', () => {
                        if(temperatureDegree.textContent == temp[0]) {
                            temperatureDegree.textContent = temp[1];
                            degreeSpan.textContent = "°F";
                        } else{
                            temperatureDegree.textContent = temp[0];
                            degreeSpan.textContent = "°C";
                        }
                    })
                });

        });
    }
});

document.querySelector(".btn-refresh").addEventListener('click', () => {
    location.reload();
});