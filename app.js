var characterStats = new XMLHttpRequest();
characterStats.open("GET", "./characters.json")
characterStats.send()
characterStats.addEventListener("load", () => {
  
  var characterMainPic = document.getElementById("characterMainPic");
  var characterPics = document.getElementsByClassName("characterPic");
  var JSONParsedResponse = JSON.parse(characterStats.responseText)

  for (let i = 0; i < characterPics.length; i++) {
    if(i == Number(localStorage.getItem("selectedCharacter"))){
      characterPics[i].setAttribute("aria-selected", true)
      characterMainPic.style.backgroundImage = `url('./img/characters/${JSONParsedResponse[i].image}')`
    }
    characterPics[i].textContent = `Select ${JSONParsedResponse[i].name}`;
    characterPics[i].onclick = () => selectCharacter(i);
  }

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