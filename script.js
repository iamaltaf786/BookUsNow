


// cards container 
const cardsContainer = document.getElementById("cards-container");

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
