"use strict";

const body = document.querySelector("#body");
//delete
const water = document.querySelector(".water");
const wheat = document.querySelector(".wheat");
const eggs = document.querySelector(".eggs");
//delete
const field = document.getElementsByClassName('field');
const progressBar = document.querySelector(".progress-bar-container");
const count = document.querySelector(".count-container");
const music = document.createElement("audio");
const sounds = document.createElement("audio");
music.setAttribute('type', 'audio/mp3');
sounds.setAttribute('type', 'audio/mp3');
const fs = document.querySelector(".button-fs");
const soundMenuBtn = document.querySelector(".button-sound");
const soundsMenu = document.getElementById("sounds-menu");
const muteMusic = document.getElementById("mute-music");
const rangeMusic = document.getElementById("range-music");
const muteSounds = document.getElementById("mute-sounds");
const rangeSounds = document.getElementById("range-sounds");

let progressBarWater = 0;
let progressBarWheat = 0;
let progressBarEggs = 0;

const counter = (function () {
  let counterWater = 0;
  let counterWheat = 0;
  let counterEggs = 0;

  function setCounterWater(newCounter) {
    counterWater = newCounter;
  }
  function getCounterWater() {
    return counterWater;
  }
  function setCounterWheat(newCounter) {
    counterWheat = newCounter;
  }
  function getCounterWheat() {
    return counterWheat;
  }
  function setCounterEggs(newCounter) {
    counterEggs = newCounter;
  }
  function getCounterEggs() {
    return counterEggs;
  }
  
  return {
    setWaterCounter: setCounterWater,
    getWaterCounter: getCounterWater,
    setWheatCounter: setCounterWheat,
    getWheatCounter: getCounterWheat,
    setEggsCounter: setCounterEggs,
    getEggsCounter: getCounterEggs,
  };
})();

const step = (function () {
  let stepWater = 20;
  let stepWheat = 20;
  let stepEggs = 20;

  function setStepWater(newStep) {
    stepWater = newStep;
  }
  function getStepWater() {
    return stepWater;
  }
  function setStepWheat(newStep) {
    stepWheat = newStep;
  }
  function getStepWheat() {
    return stepWheat;
  }
  function setStepEggs(newStep) {
    stepEggs = newStep;
  }
  function getStepEggs() {
    return stepEggs;
  }
  
  return {
    setWaterStep: setStepWater,
    getWaterStep: getStepWater,
    setWheatStep: setStepWheat,
    getWheatStep: getStepWheat,
    setEggsStep: setStepEggs,
    getEggsStep: getStepEggs,
  };
})();

// кликаем на колодец для добычи воды
water.addEventListener("click", (e) => {
  if (progressBarWater < 100) {
    progressBarWater += step.getWaterStep();
    progressWater.style.width = progressBarWater + "%";
    water.classList.remove("floating");
  } else if (progressBarWater >= 100) {
    sounds.src = "sounds/get-water.mp3";
    sounds.play();
    progressWater.style.width = "0%";
    progressBarWater = 0;
    counter.setWaterCounter(counter.getWaterCounter() + 1);
    //counterWater++;
    amountWater.textContent = counter.getWaterCounter();
    amountWaterTop.textContent = counter.getWaterCounter();
    water.classList.add("floating");
  }
});

// кликаем на поле для добычи пшеницы
wheat.addEventListener("click", (e) => {
  if (progressBarWheat < 100) {
    progressBarWheat += step.getWheatStep();
    progressWheat.style.width = progressBarWheat + "%";
    wheat.classList.remove("floating");
  } else if (progressBarWheat >= 100 && counter.getWaterCounter() > 0) {
    sounds.src = "sounds/get-wheat.mp3";
    sounds.play();
    progressWheat.style.width = "0%";
    progressBarWheat = 0;
    counter.setWaterCounter(counter.getWaterCounter() - 1);
    // counterWater--;
    amountWater.textContent = counter.getWaterCounter();
    amountWaterTop.textContent = counter.getWaterCounter();
    counter.setWheatCounter(counter.getWheatCounter() + 1);
    // counterWheat++;
    amountWheat.textContent = counter.getWheatCounter();
    amountWheatTop.textContent = counter.getWheatCounter();
    wheat.classList.add("floating");
  } else if (counter.getWaterCounter() <= 0) {
    onError(amountWater);
  }
});

// кликаем на курятник для добычи яиц
eggs.addEventListener("click", (e) => {
  if (progressBarEggs < 100) {
    progressBarEggs += step.getEggsStep();
    progressEggs.style.width = progressBarEggs + "%";
    eggs.classList.remove("floating");
  } else if (progressBarEggs >= 100 && counter.getWaterCounter() > 0 && counter.getWheatCounter() > 0) {
    sounds.src = "sounds/get-eggs.mp3";
    sounds.play();
    progressEggs.style.width = "0%";
    progressBarEggs = 0;
    counter.setWaterCounter(counter.getWaterCounter() - 1);
    // counterWater--;
    amountWater.textContent = counter.getWaterCounter();
    amountWaterTop.textContent = counter.getWaterCounter();
    counter.setWheatCounter(counter.getWheatCounter() - 1);
    // counterWheat--;
    amountWheat.textContent = counter.getWheatCounter();
    amountWheatTop.textContent = counter.getWheatCounter();
    counter.setEggsCounter(counter.getEggsCounter() + 1);
    // counterEggs++;
    amountEggs.textContent = counter.getEggsCounter();
    amountEggsTop.textContent = counter.getEggsCounter();
    eggs.classList.add("floating");
  } else if (counter.getWaterCounter() <= 0) {
    onError(amountWater);
  } else if (counter.getWheatCounter() <= 0) {
    onError(amountWheat);
  }
});

//функция ошибки
function onError(elem) {
  sounds.src = "sounds/onError.mp3";
  sounds.play();
  elem.classList.add("error");
  elem.classList.add("pulse");
  setTimeout(() => {
    elem.classList.remove("error");
    elem.classList.remove("pulse");
  }, 1000);
}

// В полноэкранный режим
fs.addEventListener("click", fullscreen);
function fullscreen() {
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitrequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.mozRequestFullscreen) {
    body.mozRequestFullScreen();
  }
}

// выход из полноэкранного режима
fs.addEventListener("click", exitFullscreen);
function exitFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

//меняем иконку на кнопке фулскрин
fs.onclick = () => {
  fs.classList.toggle("change_icon_fs");
};

//показываем меню контроля звука
soundMenuBtn.addEventListener("click", showSoundMenu);
function showSoundMenu(e) {
  soundsMenu.classList.toggle("open-sounds-menu");
  soundsMenu.classList.toggle("hatch");
} 

// меню контроля звука
soundsMenu.addEventListener("click", onSoundsMenu);
function onSoundsMenu(e) {
  if (e.target === muteSounds) {
    if (sounds.muted === false) {
      sounds.muted = true;
      muteSounds.style.backgroundImage = "url(img/muted.png)";
    } else {
      sounds.muted = false;
      muteSounds.style.backgroundImage = "url(img/unmuted.png)";
    }
  } else if (e.target === muteMusic) {
    if (music.muted === false) {
      music.muted = true;
      muteMusic.style.backgroundImage = "url(img/muted.png)";
    } else {
      music.muted = false;
      muteMusic.style.backgroundImage = "url(img/unmuted.png)";
    }
  } else if (e.target === rangeSounds) {
    sounds.volume = rangeSounds.value / 100;
  } else if (e.target === rangeMusic) {
    music.volume = rangeMusic.value / 100;
  }
}
