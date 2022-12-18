var characterStats = new XMLHttpRequest();
characterStats.open("GET", "./characters.json")
characterStats.send()
characterStats.addEventListener("load", () => {
  
  var characterPics = document.getElementsByClassName("characterPic");
  var JSONParsedResponse = JSON.parse(characterStats.responseText)

  for (let i = 0; i < characterPics.length; i++) {
    characterPics[i].textContent = `Select ${JSONParsedResponse[i].name}`;
    characterPics[i].onclick = () => selectCharacter(i);
  }

  function selectCharacter(num){
    if(num.toString() == localStorage.getItem("selectedCharacter")){
      console.log(`${JSONParsedResponse[num].name} is the currently selected character!`)
    }
    else{
      console.log(JSONParsedResponse[num])
      localStorage.setItem("selectedCharacter", num)
    }
  }

});