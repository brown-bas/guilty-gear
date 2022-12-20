var characterStats = new XMLHttpRequest();
characterStats.open("GET", "./characters.json")
characterStats.send()
characterStats.addEventListener("load", () => {
  
  var characterMainPic = document.getElementById("characterMainPic");
  var JSONParsedResponse = JSON.parse(characterStats.responseText)

  for (let i = 0; i < Object.keys(JSONParsedResponse).length; i++) {
    let characterPic = document.createElement("button");
    
    if(i == Number(localStorage.getItem("selectedCharacter"))){
      characterPic.setAttribute("aria-selected", true)
      characterMainPic.style.backgroundImage = `url('./img/characters/${JSONParsedResponse[i].image}')`
    }

    characterPic.classList.add("characterPic")
    characterPic.textContent = `Select ${JSONParsedResponse[i].name}`;
    characterPic.onclick = () => selectCharacter(i);
    document.getElementById("characterSelect").append(characterPic)
  }

  var characterPics = document.getElementsByClassName("characterPic");

  function selectCharacter(num){
    var selectedCharacter = Number(localStorage.getItem("selectedCharacter"))

    if(num == selectedCharacter){
      console.log(`${JSONParsedResponse[num].name} is the currently selected character!`)
    }

    else{
      characterPics[selectedCharacter].removeAttribute("aria-selected")
      characterPics[num].setAttribute("aria-selected", true)
      characterMainPic.style.backgroundImage = `url('./img/characters/${JSONParsedResponse[num].image}')`
      console.log(JSONParsedResponse[num])
      localStorage.setItem("selectedCharacter", num)
    }
  }

});