// Add Episode Selector.
let episodeSelector = document.getElementById("select-episode");

// Function to create Episode Cards.
function createEpisodeCard(rootElem, episodeInList) {
  let cardDiv = document.createElement("div");
  rootElem.appendChild(cardDiv);
  cardDiv.className = "card";
  
  cardDiv.setAttribute("id", `${episodeInList.season}-${episodeInList.number}`);
  
  //  Create a div with class of container for styling later.
  let containerDiv = document.createElement("div");
  cardDiv.appendChild(containerDiv);
  containerDiv.className = "container";

  //  Create the heading for the card.
  let heading = document.createElement("h4");
  containerDiv.appendChild(heading);
  heading.textContent = `${episodeInList.name} 
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

//  add Option.episodeInList
function addOption({season,number,name}) {  // Object destructuring. pass in the episode object but I need only these 3 keys.
  let selectorOption = document.createElement("option");
  episodeSelector.appendChild(selectorOption);
  selectorOption.setAttribute("value", `${season}-${number}`)
  selectorOption.textContent = `S${padLeadingZeros(season, 2)}E${padLeadingZeros(number, 2)} - ${name}`;
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
</a>`;


//  Given source code.
function searchForEpisode(element) {
  console.log("this is episode element",element.target.value);
  
  const search = element.target.value.toUpperCase();
  
  const allEpisodes = getAllEpisodes().filter(
    element => element.name.toUpperCase().includes(search)
    || element.summary.toUpperCase().includes(search));

  const rootElem = document.getElementById("root");  
  makePageForEpisodes(allEpisodes);
}



//  Callback for select option
function selectEpisode(element) {
  console.log(element.target.value);

  //To scroll to the selected episode.
  // document.getElementById(element.target.value).scrollIntoView();

  /*  SUBSTRING METHOD.
  The substring() method extracts the characters from a string, 
  between two specified indices, and returns the new sub string.
  
  This method extracts the characters in a string between
  "start" and "end", not including "end" itself.

  If "start" is greater than "end", this method will swap
  the two arguments, meaning str.substring(1, 4) == str.substring(4, 1).

  If either "start" or "end" is less than 0, it is treated as if it were 0.

  Note: The substring() method does not change the original string.
  */
  const selected = element.target.value;
  const selectedSeason = selected.substring(0, selected.indexOf("-"));
  console.log(selectedSeason);
  const selectedEpisode = selected.substring(selected.indexOf("-") + 1);
  console.log(selectedEpisode);
  
  let allEpisodes = getAllEpisodes();

  /* PARSE INT
  The parseInt() function parses a string and returns an integer.
  The radix parameter is used to specify which numeral system to be used,
  for example, a radix of 16 (hexadecimal) indicates that the number in the string
  should be parsed from a hexadecimal number to a decimal number.
  */  
  if (parseInt(selectedSeason) !== 0 && parseInt(selectedEpisode) !== 0) {     
    allEpisodes = allEpisodes.filter(episode => {
      // console.log(episode);
      return episode.season === parseInt(selectedSeason)
        &&
        episode.number === parseInt(selectedEpisode)
    });
  }

  // console.log(allEpisodes.length);
    makePageForEpisodes(allEpisodes);
} 

// function getEpisodes(showNumber) {
//   console.log("showNumber:", showNumber)
// }

function getEpisodes(showNumber) {

  const showAPI = `https://api.tvmaze.com/shows/${showNumber}/episodes`;

  fetch(showAPI)
    //  Get a response and extract the JSON.
    .then(response => {
    if(response.status >= 200 && response.status < 300){

            return response.json();}

            else{
                throw `Error ${response.status}:${response.text}`; 
            }})

    //  Do something with the JSON.
    .then(data => makePageForEpisodes(data))
    .catch (error => alert(error));

  const input = document.querySelector('input');
  input.addEventListener('input', searchForEpisode);
  
  episodeSelector.addEventListener('change', selectEpisode);  
}


//  Given source code.
function makePageForEpisodes(episodeList) {
  // console.log(`episodeList: ${episodeList}`)
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;  

  addOption({ season: 0, number: 0, name: "Show all episodes" });
  


  //  Looping through the episode in the list.
  episodeList.forEach(episodeInList => {
        
    //  Create div for the card.
    createEpisodeCard(rootElem, episodeInList);

    // Add Option for every episode.
    addOption(episodeInList);
    
  })    
};

// window.onload = setup;


/*-----Shows-----*/
/*
function createShowCard(rootElem, showInList) {
  let showCard = document.createElement("div");
  rootElem.appendChild(showCard);
  showCard.className = "card";
  showCard.setAttribute("id", `${showInList.id}`);

  //  Create a div with class of container for styling later.
  let containerDivShow = document.createElement("div");
  showCard.appendChild(containerDivShow);
  containerDivShow.className = "container";

  //  Create the heading for the card.
  let heading = document.createElement("h4");
  containerDivShow.appendChild(heading);
  heading.textContent = `${showInList.name}`;

  //  Create the image for the card.
  let imgElementShow = document.createElement("img");
  containerDivShow.appendChild(imgElementShow);
  imgElementShow.src = checkImage(showInList.image.medium);
  imgElementShow.style.width = "100%";

  //  Create the paragraph for the card.
  let paragraphElement = document.createElement("p");
  containerDivShow.appendChild(paragraphElement);
  paragraphElement.innerHTML = showInList.summary;
}

function addOptionShow(showInList) {
  let selectorOptionShow = document.createElement("option");
  showSelector.appendChild(selectorOptionShow);
  selectorOptionShow.setAttribute("value", `${showInList.id}`);
  selectorOptionShow.textContent = `${showInList.name}`;
}

function searchForShow(element) {
  console.log("this is episode element", element.value);

  const search = element.target.value;

  const allEpisodes = getAllEpisodes().filter(
    element => element.name.includes(search));

  const rootElem = document.getElementById("root");
  makePageForEpisodes(allEpisodes);
}
searchForShow()

function selectShow(element) {
  console.log(element);

  // document.getElementById(element.target.value).scrollIntoView();

  // const selected = element.target.value;
  // const selectedShow = selected;
  // console.log(selectedShow);

  // let allEpisodes = getAllEpisodes();

  // if (selectShow === showInList.name) {
  //   allEpisodes = allEpisodes.filter(show => {
  //     console.log(show);
  //     return show.name === selectedShow;
  //   });
  // }

  // console.log(allEpisodes.length);
  // makePageForEpisodes(allEpisodes);
}
*/