const statuts = function(input) {
  switch(input) {
    case 1:
      return "En ligne";
      break;
    case 2:
      return "Publication";
      break;
    case 3:
      return "Hors ligne";
      break;
    case 4:
      return "À valider";
      break;
  }
}

export default statuts;