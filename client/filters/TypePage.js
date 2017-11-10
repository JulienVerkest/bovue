const typePage = function(input) {
  switch(input) {
    case 1:
      return "Actualités";
      break;
    case 2:
      return "Document pérenne";
      break;
    case 3:
      return "Fiche élus";
      break;
    case 4:
      return "FAQ";
      break;
    case 5:
      return "Page statique";
      break;
  }
}

export default typePage