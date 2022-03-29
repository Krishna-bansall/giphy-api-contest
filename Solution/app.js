// By 404(discord) / krishna-bansall (github)

const API_KEY = "YOUR API KEY HERE";
const BASE_URL = "https://api.giphy.com/v1/gifs/search?"; // url for giphy's search api
const mainButton = document.getElementById("button-addon2");

// To Search The User Data
const searchData = async (apiKey, searchTerm) => {
  const res = await fetch(
    `${BASE_URL}api_key=${apiKey}&q=${searchTerm}&limit=12`, // Set limit to whatever you like
    {
      origin: "cors",
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// It's A Function to Generate Iframe's to be shown on screen, you can also grab mp4 files from api and
// display it as per your convenience

const embedMaker = (object) => {
  let divArray = [];
  object?.data?.forEach((element) => {
    console.log(element.images.fixed_height.url);

    const div = document.createElement("div");
    div.classList = "col-3 col-md-12 container-gif-box";
    div.innerHTML = `
          <iframe
            class="container-gif"
            src="https://giphy.com/embed/${element.id}"
            width="250px"
            height="250px"
            frameborder="0"
            class="giphy-embed"
            allowfullscreen
          ></iframe>
        
    `;
    divArray.push(div);
  });
  return divArray;
};

// Whenever the go button is clicked, this function is invoked
mainButton.onclick = async () => {
  const mainInput = document.getElementById("search-bar").value;
  const rowDiv = document.getElementById("row"); // div where gif's will be shown
  rowDiv.innerHTML = "";
  const object = await searchData(API_KEY, mainInput);
  const divs = embedMaker(object);
  divs.forEach((e) => rowDiv.appendChild(e));
};
