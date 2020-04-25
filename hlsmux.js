hlsMux = () => {
  var canale = objSelect.value;
  //fetch restituisce una promessa
  fetch(encodeURI(canale))
  .then(res => res.text())
  .then(url => {
      //riproduce il video
      hlsPlay(url);
  })
  .catch((error) => { console.log(error); });
}
