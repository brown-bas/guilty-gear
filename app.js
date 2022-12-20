var characterStats = new XMLHttpRequest();
characterStats.open("GET", "./characters.json")
characterStats.send()
characterStats.addEventListener("load", () => {

  // Declarations for the HTML elements
  var main = document.getElementById("main")
  var backgroundVideo = document.getElementById("backgroundVideo")
  var mainVideo = document.getElementById("videoContainer").getElementsByTagName("video")[0];
  var mainVideoContainer = document.getElementById("videoContainer")
  var characterMainPic = document.getElementById("characterMainPic")
  var JSONParsedResponse = JSON.parse(characterStats.responseText)

  for (let i = 0; i < Object.keys(JSONParsedResponse).length; i++) { // This whole loop appends buttons based on the JSON file
    let characterPic = document.createElement("button");
    
    if(localStorage.getItem("selectedCharacter") != undefined && i == Number(localStorage.getItem("selectedCharacter"))){
      characterPic.setAttribute("aria-selected", true)
      backgroundVideo.src = `./media/vid/${JSONParsedResponse[i].backgroundVideo}`
      characterMainPic.style.backgroundImage = `url('./media/img/characters/${JSONParsedResponse[i].image}')`
    }

    characterPic.classList.add("characterPic")
    characterPic.textContent = `Select ${JSONParsedResponse[i].name}`;
    characterPic.onclick = () => {selectCharacter(i)};
    document.getElementById("characterSelect").append(characterPic)
  }

  var characterPics = document.getElementsByClassName("characterPic");

  function selectCharacter(num){ // This function runs when you press a button that the previous loop created
    var selectedCharacter = Number(localStorage.getItem("selectedCharacter"))

    if(localStorage.getItem("selectedCharacter") != undefined && num == selectedCharacter){
      console.log(`${JSONParsedResponse[num].name} is the currently selected character!`)
    }

    else{
      characterPics[selectedCharacter].removeAttribute("aria-selected")
      characterPics[num].setAttribute("aria-selected", true)
      characterMainPic.style.backgroundImage = `url('./media/img/characters/${JSONParsedResponse[num].image}')`
      backgroundVideo.src = `./media/vid/${JSONParsedResponse[num].backgroundVideo}`
      console.log(JSONParsedResponse[num])
      localStorage.setItem("selectedCharacter", num)
    }
  }
  
  document.getElementById("start").onclick = () => {localStorage.getItem("selectedCharacter") != undefined ? playCharacterMainTheme() : console.log("No character selected!")}
  
  function playCharacterMainTheme(){
    console.log(`Playing ${JSONParsedResponse[localStorage.getItem("selectedCharacter")].name}'s theme`)
    main.classList.toggle("visible") // Make main container invisible
    mainVideoContainer.classList.toggle("visible") // Make video container visible
    backgroundVideo.classList.toggle("visible") // Make background video invisible
    mainVideo.src = "./media/vid/Guilty_Gear_Strive_-_Lets_ROCK_Green_Screen_1080p.mp4";
    //video.requestFullscreen();
    mainVideo.play();
    mainVideo.onended = () => {
      mainVideo.src = `./media/vid/${JSONParsedResponse[localStorage.getItem("selectedCharacter")].themeVideo}`;
      mainVideo.play();
      mainVideo.onended = () => {
        document.location.reload();
      }
    };
  }
});