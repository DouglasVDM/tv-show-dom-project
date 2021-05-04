// Add Show Selector.
let showSelector = document.getElementById("select-show");
console.log("showSelector =", showSelector);

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
  // console.log("rootElem:",rootElem)
  // console.log("showInlist:",showInList.name)
  let cardDiv1 = document.createElement("div");
  rootElem.appendChild(cardDiv1);
  cardDiv1.className = "card";  
  cardDiv1.setAttribute("id", `${showInList.id}`);
  
  //  Create a div with class of container for styling later.
  let containerDiv1 = document.createElement("div");
  cardDiv1.appendChild(containerDiv1);
  containerDiv1.className = "container";

  //  Create the heading1 for the card.
  let heading1 = document.createElement("h4");
  containerDiv1.appendChild(heading1);
  heading1.textContent = `${showInList.name}`;

  //  Create the image for the card.
  let imgElement1 = document.createElement("img");
  containerDiv1.appendChild(imgElement1);
  imgElement1.src = checkImage(showInList.image);
  imgElement1.style.width = "100%";

  //  Create the paragraph for the card.
  let paragraphElement1 = document.createElement("p");
  containerDiv1.appendChild(paragraphElement1);
  paragraphElement1.innerHTML = showInList.summary;
}

//  add Option.showInList
function addOptionShow({ id, name }) {  // Object destructuring. pass in the show object but I need only the 2 keys.
  // console.log(name);
  let selectorOption1 = document.createElement("option");
  showSelector.appendChild(selectorOption1);
  // console.log("showSelector =", showSelector);
  selectorOption1.setAttribute("value", id)
  selectorOption1.textContent = name;
}

// //You can edit ALL of the code here

// //Zero-pad numbers to two digits.
// function padLeadingZeros(num, size) {
//   let smallNumber = "" + num;
//   if (smallNumber.length < size) {
//     smallNumber = "0" + smallNumber;
//     return smallNumber;
//   } else {
//     return smallNumber
//   }
// }  

// Website where data originally comes from. 
// const dataSource = "TMaze.com";

//  Create footer and add link back to original site.
let footerElement1 = document.createElement("footer");
document.body.appendChild(footerElement1);
footerElement1.innerHTML = `The data originally comes from 
<a href= "https://www.tvmaze.com/shows" target = "_blank">
TvMaze
</a>}`;


//  Given source code.
function searchForShow(element) {
  console.log("this is show element",element.target.value);
  
  const search = element.target.value;  // id of the show.
  if (search == 0) {
    setup();
  } else {
    getEpisodes(search);
  }
}


function setup() {
  const allShows = getAllShows();
  makePageForShows(allShows);
// 
//   const showAPI = "https://api.tvmaze.com/shows/82/episodes";

//   fetch(showAPI)
//     //  Get a response and extract the JSON.
//     .then(response => {
//     if(response.status >= 200 && response.status < 300){

//             return response.json();}

//             else{
//                 throw `Error ${response.status}:${response.text}`; 
//             }})

//     //  Do something with the JSON.
//     .then(data => makePageForShows(data))
//     .catch (error => alert(error));
// 
  
  // const input = document.querySelector('input');
  // console.log("input:", input)
  // input.addEventListener('input', searchForShow);
  
  showSelector.addEventListener('change', searchForShow);
}


//  Given source code.
function makePageForShows(showList) {
  // console.log(`showListA: ${showList}`);
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ``;
  rootElem.textContent = `Found ${showList.length} shows.`;

  addOptionShow({ id: 0, name: "Show all shows" });

  console.log(showList[0].name)
  showList.sort((element1, element2) => {
    let name1 = element1.name.toUpperCase();
    let name2 = element2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    }
    return 0
  });
  console.log(showList[0].name)


  //  Looping through the shows in the list.
  showList.forEach(showInList => {
        
    // createShowCard(rootElem, showInList);
    showListing(showInList)
        

    // Add Option for every show.
    addOptionShow(showInList);
    // console.log(`showInList3: ${showInList.name}`);        
  });
  }

window.onload = setup;
