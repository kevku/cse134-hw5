/* rating.js */
document.addEventListener

document.addEventListener("DOMContentLoaded", function() {
  // Check if JavaScript is active
  const elementsToHide = document.querySelectorAll(".nojsForm");
  elementsToHide.forEach(element => {
    element.style.visibility = "hidden";
  });

});

const rating = document.getElementById("nojsRating");
const stars = document.getElementsByClassName("star");
const message = document.createElement("p");
const form = document.getElementById("rateForm");
const sentBy = document.getElementById("sentBy");
message.id = "message";

function highlightStars(rating) {
  for (var i = 0; i < rating; i++) {
    stars[i].classList.add("active");
  }
}

function resetStars() {
  for (var i = 0; i < stars.length; i++) {
    stars[i].classList.remove("active");
  }
}

function rate(rating) {
  resetStars();
  for (var i = 0; i < rating; i++) {
    stars[i].classList.add("active");
  }
}

const endpoint = "https://httpbin.org/post";
function lowRate(numRate) {
  for (const star of stars) {
    star.style.display = "none";
  }
  message.textContent = `Thanks for a feedback of ${numRate} stars. We'll try to do better!`;
  document.body.appendChild(message);
  rating.value = numRate;
  sentBy.value = "js";
  let formData = new FormData();
  formData.append("question", "How satisfied are you?");
  formData.append("sentBy", "js");
  formData.append("rating", numRate);
  fetch(endpoint, {
      method: "POST",
      headers: {
          "X-Sent-By": "JS",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then(data => {
      console.log("Server response:", data);
  })
  .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
  });
}

function highRate(numRate) {
  for (const star of stars) {
    star.style.display = "none";
  }
  message.textContent = `Thanks for ${numRate} Star Rating!`;
  document.body.appendChild(message);
  let formData = new FormData();
  formData.append("question", "How satisfied are you?");
  formData.append("sentBy", "js");
  formData.append("rating", numRate);
  fetch(endpoint, {
    method: "POST",
    headers: {
        "X-Sent-By": "JS",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then(data => {
      console.log("Server response:", data);
  })
  .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
  });
}


