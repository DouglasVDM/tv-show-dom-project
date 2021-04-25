// Add Show Selector.
let showSelector = document.getElementById("select-show");
// console.log("showSelector =", showSelector);

// check if images are missing.
function checkImage(image) {
  if (image === null) {
    return ""
  } else {
    return image;
  }
}

// Function to create Episode Cards.
function createShowCard(rootElem1, showInList) {
  // console.log("rootElem1:",rootElem1)
  // console.log("showInlist:",showInList.name)
  let cardDiv1 = document.createElement("div");
  rootElem1.appendChild(cardDiv1);
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
  imgElement1.src = checkImage(showInList.image.medium);
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
  
  const search = element.target.value;
  
  const allShows = getAllShows().filter(
    element => element.includes(search));

  const rootElem1 = document.getElementById("root1");  
  makePageForShows(allShows);
}




function setup1() {
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
  
  const input = document.querySelector('input');
  input.addEventListener('input', searchForShow);
  
  selectShow.addEventListener('change', showSelector);
}


//  Given source code.
function makePageForShows(showList) {
  console.log(`showListA: ${showList}`);
  const rootElem1 = document.getElementById("root1");
  rootElem1.innerHTML = "";
  rootElem1.textContent = `Found ${showList.length} shows`;  

  addOptionShow({ id: 0, name: "Show all shows" });
  


  //  Looping through the shows in the list.
  showList.forEach(showInList => {
    // console.log(`showInList1: ${showInList.name}`);
    //  Create div for the card.
    createShowCard(rootElem1, showInList);

    // Add Option for every show.
    addOptionShow(showInList);
    // console.log(`showInList3: ${showInList.name}`);
    
  });
}

// window.onload = setup1;
