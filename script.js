


// cards container 
const cardsContainer = document.getElementById("cards-container");
const eventContainer = document.getElementById("events-list");

async function fetchData() {
  try {
    const response = await fetch(
      "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco",
    );
    const data = await response.json();
    return data.events; // Assuming the events array is nested under 'events'
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function populateCards() {
  try {
    const events = await fetchData();
    events.forEach((event) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // const image = document.createElement("img");

      const imgUrl = event.imgUrl;
      const indexOfd = imgUrl.indexOf("d/");
      const indexOfview = imgUrl.indexOf("/view");
      const imgUrlId = imgUrl.slice(indexOfd + 2, indexOfview);
      const imgUrlId1 = `https://drive.google.com/thumbnail?id=${imgUrlId}`;

      const content = document.createElement("div");
      content.classList.add("content");

      card.style.backgroundImage = `url('${imgUrlId1}')`;
      card.style.backgroundRepeat = "no-repeat";
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
      card.style.transform = "scale(1.1)";

      const date = new Date(event.date);
      const formattedDate = `${date.toLocaleDateString()}`;

      const formattedDistance = (`${event.distanceKm}` / 1000).toFixed(2);

      content.innerHTML = `
        <div class="first">
            <h3>${event.eventName}</h3>
            <h4>${formattedDate}</h4>
        </div>
        
        <div class="second">
            <p> <i class="fa-solid fa-location-dot"></i> ${event.cityName}</p>
            <p>${event.weather} || ${formattedDistance}Km</p>
        </div>
      `;

      card.appendChild(content);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error populating cards:", error);
  }
}

populateCards();




// events API

async function fetchData2() {
  try {
    const response = await fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming");

    const data = await response.json();
    // console.log(data.events);
    return data.events; // events array is nested under 'events'
  } catch (error) {
    console.error("Error Event fetching data:", error);
    throw error;
  }
}


async function populateCards2() {
  try {
    const events = await fetchData2();
    // console.log(events[0].weather);



    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("eventCard");

      const imgUrl = event.imgUrl;
      const indexOfd = imgUrl.indexOf("d/");
      const indexOfview = imgUrl.indexOf("/view");
      const imgUrlId = imgUrl.slice(indexOfd + 2, indexOfview);
      const imgUrlId1 = `https://drive.google.com/thumbnail?id=${imgUrlId}`;

      const date = new Date(event.date);
      const formattedDate = `${date.toLocaleDateString()}`;

      const formattedDistance = (`${event.distanceKm}` / 1000).toFixed(2);

      eventCard.innerHTML = `
          <div class="card-img">
            <img src="${imgUrlId1}" alt="event images" />
            <p>${formattedDate}</p>
          </div>

          <p  class="eventCard-p1">${event.eventName}</p>
          <div  class="eventCard-div2">
            <p><i class="fa-solid fa-location-dot"></i> ${event.cityName}</p>
            <p>${event.weather} || ${formattedDistance}Km</p>
          </div>
      `;

      eventContainer.appendChild(eventCard);
    });
  } catch (error) {
    console.error("Error populating cards:", error);
  }
}

populateCards2();



// Loading next page js
let page = 1;
let isLoading = false;
const threshold = 100; // Threshold in pixels from the bottom of the page

function fetchNextPage() {
  if (!isLoading) {
    isLoading = true;
    fetch(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`)
      .then(response => response.json())
      .then(data => {
        if (data.events.length > 0) {
          page++;
          populateCards2(data.events);
        }
        isLoading = false;
      })
      .catch(error => {
        console.error("Error fetching next page:", error);
        isLoading = false;
      });
  }
}

// window.addEventListener('scroll', () => {
//   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//   const clientHeight = document.documentElement.clientHeight;
//   const rows = Math.floor(eventsLoaded / 6); // Calculate the number of rows
//   const currentRow = Math.floor((scrollTop + clientHeight) / clientHeight); // Calculate the current row
//   if (currentRow - rows >= 2) { // If scrolled through 2 rows
//     fetchNextPage();
//     eventsLoaded += 6; // Increment the number of events loaded
//   }
// });

// Event listener for scrolling
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    fetchNextPage();
  }
});