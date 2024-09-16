let result = document.querySelector(".result");
let postionsSelect = document.getElementById("postionsSelect");
let colors = document.querySelector(".colors");
let colorPlattes = colors.children;
let codeResult = document.querySelector(".code-result");
let refresh = document.querySelector(".refresh");
let reset = document.querySelector(".reset");
let copy = document.querySelector(".copy");
let footer = document.querySelector("footer");

postionsSelect.querySelectorAll("option").forEach((option) => {
  option.value = `to ${option.textContent.toLowerCase()}`;
});

postionsSelect.onchange = function () {
  showResult();
  updateColorsInStorage();
};

function getResult() {
  return `linear-gradient(${postionsSelect.value},${colorPlattes[0].value},${colorPlattes[1].value}) `;
}

function showResult() {
  result.style.background = getResult();
  codeResult.textContent = `background-image: ${getResult()}`;
}

window.onload = function () {
  showResult();
  if (localStorage.getItem("firstColor")) {
    colorPlattes[0].value = localStorage.getItem("firstColor")
    colorPlattes[1].value = localStorage.getItem("secondColor")

    showResult()
  } else {
    updateColorsInStorage();
  }
};

function updateColorsInStorage() {
  localStorage.setItem("firstColor", colorPlattes[0].value);
  localStorage.setItem("secondColor", colorPlattes[1].value);
}

colors.querySelectorAll("input").forEach((input) => {
  input.onchange = function () {
    showResult();
    updateColorsInStorage()
  };
});

function getRandomColor() {
  return (Math.random() * 10).toString(16).replace(".", "").slice(0, 6);
}

refresh.onclick = function () {
  Array.from(colorPlattes).forEach((color) => {
    color.value = `#${getRandomColor()}`;
  });
  showResult();
  updateColorsInStorage()
};

reset.onclick = function () {
  Array.from(colorPlattes).forEach((color) => {
    color.value = color.getAttribute("data-default");
  });
  showResult();
  updateColorsInStorage()
};

copy.onclick = function () {
  codeResult.select();
  navigator.clipboard.writeText(codeResult.value);
  copy.textContent = "Code Copied!";
  setTimeout(() => {
    copy.textContent = "Copy Code";
  }, 1000);
};

Array.prototype.typeWriter = function (element) {
  let currentIndex = 0;
  let currentWord = 0;
  let that = this;
  function interv() {
    let postChar = setInterval(function () {
      element.textContent += that[currentWord][currentIndex];
      currentIndex++;
      if (that[currentWord].length == currentIndex) {
        clearInterval(postChar);
        setTimeout(function () {
          let removeChar = setInterval(function () {
            currentIndex--;
            element.textContent = element.textContent.substring(
              0,
              currentIndex
            );
            if (currentIndex == 0) {
              clearInterval(removeChar);
              currentWord++;
              if (currentWord != that.length) {
                interv();
              } else {
                setTimeout(function () {
                  currentWord = 0;
                  interv();
                }, 1000);
              }
            }
          }, 100);
        }, 500);
      }
    }, 100);
  }
  interv();
};

["Mo3bassia", "Front End Web Developer"].typeWriter(
  footer.querySelectorAll("a")[1]
);
