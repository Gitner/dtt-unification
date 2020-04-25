getArrow = (e) => {
  const key = e.which||e.keyCode;
  switch(key) {
    case 37:
      //freccia sx
      break;
    case 38:
      //freccia su: vai al canale successivo
      objSelect.selectedIndex = ++objSelect.selectedIndex % objSelect.length;
      hlsMux();
      break;
    case 39:
      //freccia dx
      break;
    case 40:
      //frecci giù: vai al canale precedente
      objSelect.selectedIndex = (objSelect.length + --objSelect.selectedIndex) % objSelect.length;
      hlsMux();
      break;
  }
}
