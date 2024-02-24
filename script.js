
const form = document.getElementById('form');
const current = document.getElementById('current');
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser');
    }
}
function showPosition(position){
    let lat= position.coords.latitude ;
    let long = position.coords.longitude;
    // console.log(lat + " " + long);
    fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=285385f6d5c140909605d2cb1f3e457c`
    ).then(resp => resp.json())
    .then((data) => {
        // console.log(data);
        if (data) {
            const currInfo = data.results[0];
            // console.log(currInfo.timezone.name);
            document.getElementById('curr-timezone').innerText = currInfo.timezone.name;
            document.getElementById('curr-lat').innerText = lat;
            document.getElementById('curr-long').innerText = long;
            document.getElementById('curr-std').innerText = currInfo.timezone.offset_STD;
            document.getElementById('curr-std-seconds').innerText = currInfo.timezone.offset_STD_seconds;
            document.getElementById('curr-dst').innerText = currInfo.timezone.offset_DST;
            document.getElementById('curr-dst-seconds').innerText = currInfo.timezone.offset_DST_seconds;
            document.getElementById('curr-country').innerText = currInfo.country;
            document.getElementById('curr-postcode').innerText = currInfo.postcode;
            document.getElementById('curr-city').innerText = currInfo.city;
        } else {
            console.log("No location found");
        }
    });
}
getLocation();
form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const address = form.address.value;
    fillingAddress(address);
    form.reset();
})

function fillingAddress(address){
    fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=285385f6d5c140909605d2cb1f3e457c`
    ).then(resp => resp.json())
    .then((data) => {
        console.log(data);
        if (data) {
            const Info = data.features[0].properties;
            const container = document.createElement('div');
            container.className = 'container';
            container.innerHTML = `
                <p>Name Of Time Zone: <span id="s-timezone">${Info.timezone.name}</span></p>
                <div class="lat-long">
                    <p>Lat: <span id="s-lat">${Info.lat}</span></p>
                    <p>Long: <span id="s-long">${Info.lon}</span></p>
                </div>
                <p>Offset STD: <span id="s-std">${Info.timezone.offset_STD}</span></p>
                <p>Offset STD Seconds: <span id="s-std-seconds">${Info.timezone.offset_STD_seconds}</span></p>
                <p>Offset DST:: <span id="curr-dst"></span>${Info.timezone.offset_DST}</p>
                <p>Offset DST Seconds: <span id="s-dst-seconds">${Info.timezone.offset_DST_seconds}</span></p>
                <p>Country: <span id="s-country">${Info.country}</span></p>
                <p>Postcode: <span id="s-postcode">${Info.country_code}</span></p>
                <p>City: <span id="s-city">${Info.city}</span></p>`;
                document.getElementById('search').appendChild(container);
            
        } else {
            console.log("No location found");
            alert('No locoation found!')
        }
    });
}