const typeWriter = async (text, n, where) => {
  // Define an array of colors
  var colors = ["red", "green", "blue", "purple", "orange"];

  return new Promise(async (resolve, reject) => {
    if (n < text.length) {
      var textelement = document.getElementById("text")

      // Get the current letter and corresponding color from the array
      var currentLetter = text[n];
      var currentColor = colors[n % colors.length];

      // Wrap the current letter with a <span> and set its color
      var spanElement = $('<span>').text(currentLetter).css('color', currentColor);

      // Append the <span> element to the existing content
      $(where).append(spanElement);

      n++;
      // setTimeout(function () {
      //   typeWriter(text, n, where);
      // }, 100);
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms using async/await
      await typeWriter(text, n, where); // Use await to pause execution
    } else {
      console.log("ter,in")
      resolve("hola")
    }
  })
}

const sleep = mili => new Promise(resolve => setTimeout(resolve, mili));

const typeWriter2 = async (text, where) => {
  var colors = ["red", "green", "blue", "purple", "orange"];
  var textElement = document.getElementById("text");


  for (let n = 0; n < text.length; n++) {
    var currentLetter = text[n];
    var currentColor = colors[n % colors.length];

    // Wrap the current letter with a <span> and set its color
    var spanElement = $('<span>').text(currentLetter).css('color', currentColor);

    // Append the <span> element to the existing content
    $(where).append(spanElement);


    await sleep(80)
  }

  return "Done";
};

let audio = null
// Example usage
window.addEventListener("load", async () => {
  audio = new Audio("/img/macrenaaa.mp3");
  var textToType = "Hola, has sido invitade a la fiesta/ graduación/ baile/ gala de Mati";
  let hola = await typeWriter2(textToType, "#text2")
  await sleep(500)
  await typeWriter2("Estás liste?", "#text3")
  $("#play_btn").addClass("visible")
  console.log(hola)



  $("#play_btn").on("click", () => {
    audio.play()
    console.log("hola")
    $(".segundo").hide()
    $("body").addClass("black")
    $("#canvas").show()

    $("#gif_inicial").show(600)

    setTimeout(()=>{
      $("#gif_inicial").hide(700)
      $("#gif_inicial2").show(600)
      $("#gif_inicial3").show(600)
      $("#gif_inicial4").show(600)
      $("#gif_inicial5").show(600)



      $("#info").show()

      const myEvent = new CustomEvent("myevent", {
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      window.dispatchEvent(myEvent);
    

    },10000)

  })
})

