$(document).ready(function () {
  //create a event handler that handles all the click and fcn
  openPokeDex();
  closePokeDex();
});

const openPokeDex = () => {
  $("#pokeDexFront").click(function(){
    console.log('clicked to open');
    $("#pDFrontContainer").addClass("openDex");
    // $("#pDFrontContainer").attr("display","none");

  })
  
}

const closePokeDex = () => {
  $("#close").click(function(){
    console.log('clicked to close')
  })
}