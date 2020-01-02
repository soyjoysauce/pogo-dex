$(document).ready(function () {
  console.log("hello world");
  let pokeDexCover = $(".pDFrontContainer");
  console.log('pokeDexCover :', pokeDexCover);


  pokeDexCover.click(function(e) {
    console.log('clicked the cover');
    //if clicked on pokeDexCover
    if (e === pokeDexCover) {
      console.log("open!")
      //plug in animation by using toggleClass()to apply openPokedex
      openPokeDex();
    } else {
      console.log("closed!")
      closePokeDex();
    }
  });

});