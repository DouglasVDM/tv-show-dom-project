// Add a Form for the Selector.
// let formForSelector = document.createElement("form");
// document.body.appendChild(formForSelector);

// Add Episode Selector.
let episodeSelector = document.getElementById("select-episode");


// Function to create Episode Cards.
function createEpisodeCard(rootElem, episodeInList) {
  let cardDiv = document.createElement("div");
  rootElem.appendChild(cardDiv);
  cardDiv.className = "card";

  //  Create a div with class of container for styling later.
  let containerDiv = document.createElement("div");
  cardDiv.appendChild(containerDiv);
  containerDiv.className = "container";

  //  Create the heading for the card.
  let heading = document.createElement("h4");
  containerDiv.appendChild(heading);
  containerDiv.textContent = `${episodeInList.name} 
    - S${padLeadingZeros(episodeInList.season, 2)}
    E${padLeadingZeros(episodeInList.number, 2)}`;

  //  Create the image for the card.
  let imgElement = document.createElement("img");
  containerDiv.appendChild(imgElement);
  imgElement.src = episodeInList.image.medium;
  imgElement.style.width = "100%";

  //  Create the paragraph for the card.
  let paragraphElement = document.createElement("p");
  containerDiv.appendChild(paragraphElement);
  paragraphElement.innerHTML = episodeInList.summary;
}

//  add Option.
function addOption(episodeInList) {
  let selectorOption = document.createElement("option");
  episodeSelector.appendChild(selectorOption);
  selectorOption.textContent = `S${padLeadingZeros(episodeInList.season, 2)}E${padLeadingZeros(episodeInList.number, 2)} - ${episodeInList.name}`;
}

//You can edit ALL of the code here

//Zero-pad numbers to two digits.
function padLeadingZeros(num, size) {
  let smallNumber = "" + num;
  if (smallNumber.length < size) {
    smallNumber = "0" + smallNumber;
    return smallNumber;
  } else {
    return smallNumber
  }
}  

// Website where data originally comes from. 
const dataSource = "TMaze.com";

// Create footer and add link back to original site.
let footerElement = document.createElement("footer");
document.body.appendChild(footerElement);
footerElement.innerHTML = `The data originally comes from 
<a href= "https://www.tvmaze.com/shows/82/game-of-thrones" target = "_blank">
TvMaze
</a>}`;


//  Given source code.
function searchForEpisode(element) {
  console.log("this is element",element.target.value);
  
  const search = element.target.value.toUpperCase();
  
  const allEpisodes = getAllEpisodes().filter(
    element => element.name.toUpperCase().includes(search)
    || element.summary.toUpperCase().includes(search));

  const rootElem = document.getElementById("root");  
  makePageForEpisodes(allEpisodes);
}


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  
  const input = document.querySelector('input');
  input.addEventListener('input', searchForEpisode); 
}


//  Given source code.
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;  
  
  //  Looping through the episode in the list.
  episodeList.forEach(episodeInList => {
        
    //  Create div for the card.
    createEpisodeCard(rootElem, episodeInList);

    // Add Option for Selector.
    addOption(episodeInList);
    
  })    
};  
window.onload = setup;
