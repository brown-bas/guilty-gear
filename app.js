var characterStats = new XMLHttpRequest();
characterStats.open("GET", "./characters.json")
characterStats.send()
characterStats.addEventListener("load", ()=>{
  console.log(JSON.parse(characterStats.responseText)[0]) //we can do anything with that data from here c:
});