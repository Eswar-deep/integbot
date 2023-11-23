const roundButton = document.querySelector(".round-button");
const query_bar_1 = document.querySelector(".query_bar_1");
//const query_bar_2=document.querySelector(".query_bar_2");
const queryForm2 = document.querySelector(".query_bar_2");

roundButton.addEventListener("click", () => {
  roundButton.style.display = "none";

  const frame1 = document.querySelector(".frame-1");
  frame1.style.display = "block";
});

query_bar_1.addEventListener("click", () => {
  document.querySelector(".frame-1").style.display = "none";

  const frame2 = document.querySelector(".frame-2");
  frame2.style.display = "block";
});

// query_bar_2.addEventListener("click", () => {
//     document.querySelector(".frame-2").style.display = "none";

//     const frame3 = document.querySelector(".frame-3");
//     frame3.style.display = "block";
// });

queryForm2.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  const userInput = queryForm2.querySelector("input").value;

  // Hide frame 2
  const frame2 = document.querySelector(".frame-2");
  frame2.style.display = "none";

  // Show frame 3
  const frame3 = document.querySelector(".frame-3");
  frame3.style.display = "block";

  // Update the user's input in frame 3
  const userResponse = frame3.querySelector(".user-response .response");
  userResponse.textContent = userInput;
  queryForm2.querySelector("input").value = "";
});
