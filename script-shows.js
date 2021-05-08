// Add Show Selector.
let showSelector = document.getElementById("select-show");
let allShows = null;

// check if images are missing.
function checkImage(image) {
  if (image === null) {
    return ""
  } else {
    return image.medium;
  }
}

function showListing(show) {
  const listCard = document.createElement("div");
  // listCard.className = "card";
  listCard.innerHTML = `
      <div class="show-name-div">
        <h1>${show.name}</h1>
        <img src=${checkImage(show.image)} alt="">
        <div class="summary-div">
          ${show.summary}
        </div>
        <div class="show-info-div">
          <ul>
            <li><strong>Rated</strong>: ${show.rating.average}</li>
            <i><strong>Genres</strong>: ${show.genres.join(" | ")}</i>            
            <li><strong>Status</strong>: ${show.status}</li>
            <li><strong>Runtime</strong>: ${show.runtime}</li>
          </ul>
        </div>
      </div>`
  document.getElementById("root").appendChild(listCard);
}

// Function to create Episode Cards.
function createShowCard(rootElem, showInList) {
  let cardDiv1 = cardDiv(rootElem, showInList);  
  //  Create a div with class of container for styling later.
  let containerDiv1 = containerDiv(cardDiv1);
  //  Create the heading1 for the card.
  headerElement(containerDiv1, showInList);
  //  Create the image for the card.
  imageElement(containerDiv1, showInList);
  //  Create the paragraph for the card.
  paragraphElement(containerDiv1, showInList);
}

function cardDiv(rootElem, showInList) {
  let cardDiv1 = document.createElement("div");
  rootElem.appendChild(cardDiv1);
  cardDiv1.className = "card";
  cardDiv1.setAttribute("id", `${showInList.id}`);
  return cardDiv1;
}

function containerDiv(cardDiv1) {
  let containerDiv1 = document.createElement("div");
  cardDiv1.appendChild(containerDiv1);
  containerDiv1.className = "container";
  return containerDiv1;
}

function headerElement(containerDiv1, showInList) {
  let heading1 = document.createElement("h4");
  containerDiv1.appendChild(heading1);
  heading1.textContent = `${showInList.name}`;
}

function imageElement(containerDiv1, showInList) {
  let imgElement1 = document.createElement("img");
  containerDiv1.appendChild(imgElement1);
  imgElement1.src = checkImage(showInList.image);
}

function paragraphElement(containerDiv1, showInList) {
  let paragraphElement1 = document.createElement("p");
  containerDiv1.appendChild(paragraphElement1);
  paragraphElement1.innerHTML = showInList.summary.length;
}

//  add Option.showInList
function addOptionShow({ id, name }) {
  let selectorOption1 = document.createElement("option");
  showSelector.appendChild(selectorOption1);
  selectorOption1.setAttribute("value", id)
  selectorOption1.textContent = name;
}

let footerElement1 = document.createElement("footer");
document.body.appendChild(footerElement1);
footerElement1.innerHTML = `The data originally comes from 
<a href= "https://www.tvmaze.com/shows" target = "_blank">
TvMaze
</a>}`;

function selectShow(element) {  
  const search = element.target.value;  // id of the show.
  if (search == 0) {
    setup();
  } else {
    getEpisodes(search);
  }
}

function setup() {
  allShows = getAllShows();
  makePageForShows(allShows);
  clearEpisodeList();  
  toggleSearchEvent(searchForEpisode, searchForShow);
  showSelector.addEventListener('change', selectShow);
}

function searchForShow(event) {
  const { value } = event.target;
  let filteredShow = allShows.filter(({ name, summary }) => name.toUpperCase().includes(value.toUpperCase()) || summary.toUpperCase().includes(value.toUpperCase())
  )  
  makePageForShows(filteredShow);
}

function toggleSearchEvent(callbackToRemove, newCallback) {
  const input = document.querySelector('input');  
  input.removeEventListener("input", callbackToRemove, false)
  input.addEventListener("input", newCallback);
}

function makePageForShows(showList) {
  rootElement(showList);
  addOptionShow({ id: 0, name: "Show all shows" });
  alphabeticalSorting(showList);

  //  Looping through the shows in the list.
  showList.forEach(showInList => {     
    showListing(showInList)
    addOptionShow(showInList);
  });
  }

window.onload = setup;

function rootElement(showList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ``;
  rootElem.textContent = `Found ${showList.length} shows.`;
}

function alphabeticalSorting(showList) {
  showList.sort((element1, element2) => {
    let name1 = element1.name.toUpperCase();
    let name2 = element2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    }
    return 0;
  });
}

/*

    //  Higlight search words
    const $paragraph = showInList.summary[0];
    const $search = document.querySelector("input");

    $search.addEventListener('input', (event) => {
      console.log(event.target.value);
      const searchText = event.target.value;
      const regex = new RegExp(searchText, 'gi');

      let text = $paragraph.innerHTML;
      text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

      const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
      $paragraph.innerHTML = newText;
    });
*/