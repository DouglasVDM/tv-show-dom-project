//You can edit ALL of the code here

//Zero-pad numbers to two digits.
function padLeadingZeros(num, size) {
  let smallNumber = "" + num;
  while (smallNumber.length < size) {
    smallNumber = "0" + smallNumber;
    return smallNumber;
  }
}

// Website where data originally comes from. 
const dataSource = "TVMaze.com";

// Create footer and add link back to original site.
let footerElement = document.createElement("footer");
document.body.appendChild(footerElement);
footerElement.innerHTML = `The data originally comes from ${dataSource.link("https://www.tvmaze.com/shows/82/game-of-thrones")}`;

//  Given source code.
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

//  Given source code.
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;  
  
  //  Looping through the episode in the list.
  episodeList.forEach(episodeInList => {
    
    //  Create div for the card.
    let cardDiv = document.createElement("div");
    rootElem.appendChild(cardDiv);
    cardDiv.className = "card";
    
    //  Create a div with class of container for styling later.
    let containerDiv = document.createElement("div");
    cardDiv.appendChild(containerDiv);
    containerDiv.className = "container";

    //  Create the heading for the card.
    let heading = document.createElement("h4")
    containerDiv.appendChild(heading);
    containerDiv.textContent = `${episodeInList.name} - S${padLeadingZeros(episodeInList.season, 2)}E${padLeadingZeros(episodeInList.number, 2)}`;
    
    //  Create the image for the card.
    let imgElement = document.createElement("img");
    containerDiv.appendChild(imgElement);
    imgElement.src = episodeInList.image.medium;
    imgElement.style.width = "100%";
    
    //  Create the paragraph for the card.
    let paragraphElement = document.createElement("p");
    containerDiv.appendChild(paragraphElement);
    paragraphElement.innerHTML = episodeInList.summary;    
  })  
};
window.onload = setup;
