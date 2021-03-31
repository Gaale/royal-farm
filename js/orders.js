"use strict";

const order = document.createElement("div");
const template = document.querySelector("#tmplt2");
order.append(template.content.children[0].cloneNode(true));
document.body.append(order);
const goodsArr = ["Воды", "Пшеницы", "Яиц"];
const agree = document.getElementById("order_agree");
const disagree = document.getElementById("order_disagree");
const done = document.getElementById("order_done");
const orderQuantity = document.querySelector("#order-quantity");
const orderReward = document.querySelector("#order-reward");
const orderFail = document.querySelector("#order-fail");
const timer = document.querySelector("#order-timer");
const intro = document.querySelector("#intro");
const continueGame = document.querySelector("#btn-intro1");
const newGame = document.querySelector("#btn-intro2");
const textOrder = document.querySelector(".text_order");
const orderTimerImg = document.querySelector("#order-timer-img");
const onloadGame = document.getElementById("preload");
const boxes = document.querySelector(".loading");

let typeOfGoods = 0;
let quantityOfGoods = 0;
let time = 0;
let intervalKiller = null;

window.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    intro.style.display = "block";
    intro.style.animation = "intro_ani 1s forwards";
    boxes.remove();
  }, 3000);
});

//при закрытии страницы сохранили прогресс и остановили таймер
window.addEventListener("unload", saveData);
function saveData() {
  clearInterval(intervalKiller);
  localStorage.setItem("gold", goldSumm.get());
  localStorage.setItem("counterWater", counter.getWaterCounter());
  localStorage.setItem("counterWheat", counter.getWheatCounter());
  localStorage.setItem("counterEggs", counter.getEggsCounter());
  localStorage.setItem("stepWater", step.getWaterStep());
  localStorage.setItem("stepWheat", step.getWheatStep());
  localStorage.setItem("stepEggs", step.getEggsStep());
}

//нажали кнопку "продолжить" на интро
continueGame.addEventListener("click", (e) => {
  counter.setWaterCounter( +localStorage.getItem("counterWater"));
  counter.setWheatCounter( +localStorage.getItem("counterWheat") );
  counter.setEggsCounter( +localStorage.getItem("counterEggs") );
  step.setWaterStep( +localStorage.getItem("stepWater") );
  step.setWheatStep( +localStorage.getItem("stepWheat") );
  step.getEggsStep( +localStorage.getItem("stepEggs") );
  goldSumm.set(+localStorage.getItem("gold"));
  gold.textContent = goldSumm.get();
  amountWater.textContent = counter.getWaterCounter();
  amountWaterTop.textContent = counter.getWaterCounter();
  amountWheat.textContent = counter.getWheatCounter();
  amountWheatTop.textContent = counter.getWheatCounter();
  amountEggs.textContent = counter.getEggsCounter();
  amountEggsTop.textContent = counter.getEggsCounter();
  


  switch (step.getWaterStep()) {
    case 20:
      break;
    case 25:
      waterSpeedUp(25, 300, "Серебряное ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 33.34:
      waterSpeedUp(33.34, 500, "Золотое ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 50:
      waterSpeedUp(50, 1000, "Платиновое ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 100:
      waterSpeedUp(
        100,
        3000,
        "Поздравляем, кажется вы купили все возможные улучшения в этом разделе"
      );
      textSpeedUpWater.style.fontSize = "20px";
      textSpeedUpWater.style.padding = "20px 10px";
      coins[0].remove();
      costSpeedUpWater.remove();
      buySpeedUpWater.remove();
      break;
  }

  switch (step.getWheatStep()) {
    case 20:
      break;
    case 25:
      wheatSpeedUp(25, 600, "Хорошее удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 33.34:
      wheatSpeedUp(33.34, 1500, "Отличное удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 50:
      wheatSpeedUp(50, 2500, "Лучшее удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 100:
      wheatSpeedUp(
        100,
        6000,
        "Поздравляем, кажется вы купили все возможные улучшения в этом разделе"
      );
      textSpeedUpWheat.style.fontSize = "20px";
      textSpeedUpWheat.style.padding = "20px 10px";
      coins[1].remove();
      costSpeedUpWheat.remove();
      buySpeedUpWheat.remove();
      break;
  }
  switch (step.getEggsStep()) {
    case 20:
      break;
    case 25:
      eggsSpeedUp(25, 1500, "Хороший корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 33.34:
      eggsSpeedUp(33.34, 4000, "Отличный корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 50:
      eggsSpeedUp(50, 10000, "Лучший корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 100:
      eggsSpeedUp(
        100,
        25000,
        "Поздравляем, кажется вы купили все возможные улучшения в этом разделе"
      );
      textSpeedUpEggs.style.fontSize = "20px";
      textSpeedUpEggs.style.padding = "20px 10px";
      coins[2].remove();
      costSpeedUpEggs.remove();
      buySpeedUpEggs.remove();
      break;
  }
  music.src = "sounds/music.mp3";
  music.preload = "auto";
  music.play();
  music.loop = "true";
  sounds.src = "sounds/btn-store.mp3";
  sounds.play();
  intro.style.display = "none";
  onloadGame.style.display = "none";
  setTimeout(createOrder, 60000);
});

newGame.addEventListener("click", (e) => {
  localStorage.clear();
  music.src = "sounds/music.mp3";
  music.preload = "auto";
  music.play();
  music.loop = "true";
  sounds.src = "sounds/btn-store.mp3";
  sounds.play();
  intro.style.display = "none";
  onloadGame.style.display = "none";
  setTimeout(createOrder, 60000);
});

function getGoogsType() {
  let type = goodsArr[Math.floor(Math.random() * 3)];
  return type;
}

function getQuantity(coef) {
  let quantity = Math.floor(Math.random() * coef + 1) * 10;
  return quantity;
}

// функция создания рандомного заказа
function createOrder() {
  sounds.src = "sounds/create-order.mp3";
  sounds.play();
  order.children[0].style.display = "flex";
  agree.style.display = "inline-block";
  disagree.style.display = "inline-block";
  done.style.display = "none";
  textOrder.children[0].style.display = "inline";
  timer.style.display = "inline-block";
  timer.style.fontSize = "23px";
  timer.style.color = "black";
  orderTimerImg.setAttribute("width", "23px");
  order.children[0].children[0].style.backgroundImage = "url(img/king.png)";
  order.children[0].style.animation = "order_ani 2s forwards";
  typeOfGoods = getGoogsType();
  quantityOfGoods = getQuantity(10);
  orderQuantity.textContent = `${quantityOfGoods} ${typeOfGoods}`;
  getCost(orderReward, 1.3);
  getCost(orderFail, -1.5);
  getTimeShow();
  document.body.append(order);
}

//Приняли заказ
agree.addEventListener("click", () => {
  sounds.src = "sounds/agree.mp3";
  sounds.play();
  agree.style.display = "none";
  disagree.style.display = "none";
  done.style.display = "inline-block";
  textOrder.children[0].style.display = "none";
  timer.style.display = "block";
  timer.style.fontSize = "36px";
  timer.style.color = "red";
  orderTimerImg.setAttribute("width", "0px");
  order.children[0].style.animation = "order_ani2 2s forwards";
  let str = timer.textContent;
  let minutes = +str.slice(3, 5);
  let seconds = +str.slice(6, 8);
  intervalKiller = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      if (seconds < 10 && minutes < 10) {
        timer.textContent = "00:0" + minutes + ":0" + seconds;
      } else if (seconds < 10) {
        timer.textContent = "00:" + minutes + ":0" + seconds;
      } else if (minutes < 10) {
        timer.textContent = "00:0" + minutes + ":" + seconds;
      }
    } else if (seconds === 0 && minutes > 0) {
      seconds = 59;
      minutes--;
    } else if (seconds === 0 && minutes === 0) {
      clearInterval(intervalKiller);
      if (goldSumm.get() + parseInt(orderFail.textContent) < 0) {
        goldSumm.set(0);
        gold.textContent = goldSumm.get();
      } else {
        goldSumm.set(goldSumm.get() + parseInt(orderFail.textContent));
        gold.textContent = goldSumm.get();
      }
      order.children[0].children[0].style.backgroundImage =
        "url(img/angry_king.png)";
      onError(timer);
      setTimeout(() => {
        order.remove();
      }, 3000);
      setTimeout(createOrder, 60000);
    }
  }, 1000);
});

//отказались от заказа
disagree.addEventListener("click", () => {
  sounds.src = "sounds/disagree.mp3";
  sounds.play();
  order.remove();
  setTimeout(createOrder, 60000);
});

//Получили цену награды и штрафа заказа
function getCost(elem, coef) {
  if (typeOfGoods === "Воды") {
    elem.textContent = quantityOfGoods * price.getWaterPrice() * coef + " золотых";
  } else if (typeOfGoods === "Пшеницы") {
    elem.textContent = quantityOfGoods * price.getWheatPrice() * coef + " золотых";
  } else if (typeOfGoods === "Яиц") {
    elem.textContent = quantityOfGoods * price.getEggsPrice() * coef + " золотых";
  }
}

//Получили время на выполнение заказа
function getTimeShow() {
  if (typeOfGoods === "Воды") {
    time = quantityOfGoods + 60;
  } else if (typeOfGoods === "Пшеницы") {
    time = quantityOfGoods * 2 + 60;
  } else if (typeOfGoods === "Яиц") {
    time = quantityOfGoods * 3 + 60;
  }
  let sec = time % 60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  timer.textContent = "00:0" + Math.ceil(time / 60) + ":" + sec;
}

//нажали кнопку "Отправить" на заказе
done.addEventListener("click", () => {
  if (typeOfGoods === "Воды" && quantityOfGoods <= counter.getWaterCounter()) {
    counter.setWaterCounter(counter.getWaterCounter() - quantityOfGoods);
    amountWater.textContent = counter.getWaterCounter() + "";
    amountWaterTop.textContent = counter.getWaterCounter() + "";
    ifDone();
    done.style.display = 'none';
  } else if (typeOfGoods === "Пшеницы" && quantityOfGoods <= counter.getWheatCounter()) {
    counter.setWheatCounter(counter.getWheatCounter() - quantityOfGoods);
    amountWheat.textContent = counter.getWheatCounter();
    amountWheatTop.textContent = counter.getWheatCounter();
    ifDone();
    done.style.display = 'none';
  } else if (typeOfGoods === "Яиц" && quantityOfGoods <= counter.getEggsCounter()) {
    counter.setEggsCounter(counter.getEggsCounter() - quantityOfGoods);
    amountEggs.textContent = counter.getEggsCounter();
    amountEggsTop.textContent = counter.getEggsCounter();
    ifDone();
    done.style.display = 'none';
  } else {
    onError(done);
  }
});

function ifDone() {
  clearInterval(intervalKiller);
  sounds.src = "sounds/done.mp3";
  sounds.play();
  goldSumm.set(goldSumm.get() + parseInt(orderReward.textContent));
  gold.textContent = goldSumm.get();
  order.children[0].children[0].style.backgroundImage =
    "url(img/kind_king.png)";
  setTimeout(() => {
    order.remove();
  }, 3000);
  setTimeout(createOrder, 60000);
}
