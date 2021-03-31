"use strict";

const buttonStore = document.querySelector(".button-store");
const store = document.querySelector(".container-store");
const buttonSell = document.querySelector(".button-sell");
const buttonBuy = document.querySelector(".button-buy");
const sell = document.getElementById("selling");
const buy = document.getElementById("buying");
const plusWater = document.getElementById("plus-water");
const plusWheat = document.getElementById("plus-wheat");
const plusEggs = document.getElementById("plus-eggs");
const num = document.getElementsByClassName('num');
const minusWater = document.getElementById("minus-water");
const minusWheat = document.getElementById("minus-wheat");
const minusEggs = document.getElementById("minus-eggs");
const totalWater = document.getElementById("total-water");
const totalWheat = document.getElementById("total-wheat");
const totalEggs = document.getElementById("total-eggs");
const soldWater = document.getElementById("sold-water");
const soldWheat = document.getElementById("sold-wheat");
const soldEggs = document.getElementById("sold-eggs");
const gold = document.getElementById("gold-show");
const coins = document.querySelectorAll(".coins-img");
const costSpeedUpWater = document.getElementById("cost-speed-up-water");
const costSpeedUpWheat = document.getElementById("cost-speed-up-wheat");
const costSpeedUpEggs = document.getElementById("cost-speed-up-eggs");
const buySpeedUpWater = document.getElementById("buy-speed-up-water");
const buySpeedUpWheat = document.getElementById("buy-speed-up-wheat");
const buySpeedUpEggs = document.getElementById("buy-speed-up-eggs");
const textSpeedUpWater = document.getElementById("text-speed-up-water");
const textSpeedUpWheat = document.getElementById("text-speed-up-wheat");
const textSpeedUpEggs = document.getElementById("text-speed-up-eggs");
const quitFromSell = document.getElementById("quit_sell");
const quitFromBuy = document.getElementById("quit_buy");
const toBuySmthBtn = document.getElementById("to_buy_smth");
const toSellSmthBtn = document.getElementById("to_sell_smth");
const BntOnGold = document.getElementById("gold_btn");

let counterWaterStore = 0;
let counterWheatStore = 0;
let counterEggsStore = 0;

const goldSumm = (function () {
  let summ = 0;

  function setSumm(newSumm) {
    summ = newSumm;
  }
  function getSumm() {
    return summ;
  }

  return {
    set: setSumm,
    get: getSumm,
  };
})();

const price = (function () {
  let priceOfWater = 1;
  let priceOfWheat = 3;
  let priceOfEggs = 10;

  function getPriceOfWater() {
    return priceOfWater;
  }
  function getPriceOfWheat() {
    return priceOfWheat;
  }
  function getPriceOfEggs() {
    return priceOfEggs;
  }
  return {
    getWaterPrice: getPriceOfWater,
    getWheatPrice: getPriceOfWheat,
    getEggsPrice: getPriceOfEggs,
  };
})();

const priceSpeedUp = (function () {
  let priceSpeedUpOfWater = 100;
  let priceSpeedUpOfWheat = 250;
  let priceSpeedUpOfEggs = 600;

  function setPriceSpeedUpOfWater(newPriceOfWater) {
    priceSpeedUpOfWater = newPriceOfWater;
  }
  function getPriceSpeedUpOfWater() {
    return priceSpeedUpOfWater;
  }
  function setPriceSpeedUpOfWheat(newPriceOfWheat) {
    priceSpeedUpOfWheat = newPriceOfWheat;
  }
  function getPriceSpeedUpOfWheat() {
    return priceSpeedUpOfWheat;
  }
  function setPriceSpeedUpOfEggs(newPriceOfEggs) {
    priceSpeedUpOfWheat = newPriceOfEggs;
  }
  function getPriceSpeedUpOfEggs() {
    return priceSpeedUpOfEggs;
  }
  
  return {
    setWaterSpeedUpPrice: setPriceSpeedUpOfWater,
    getWaterSpeedUpPrice: getPriceSpeedUpOfWater,
    setWheatSpeedUpPrice: setPriceSpeedUpOfWheat,
    getWheatSpeedUpPrice: getPriceSpeedUpOfWheat,
    setEggsSpeedUpPrice: setPriceSpeedUpOfEggs,
    getEggsSpeedUpPrice: getPriceSpeedUpOfEggs,
  };
})();

// открываем и закрываем магазин
buttonStore.addEventListener("click", showStore);

function showStore() {
  sounds.src = "sounds/btn-store.mp3";
  sounds.play();
  store.classList.toggle("openStore");
  store.classList.toggle("hatch");
  buy.classList.remove("openBuy");
  sell.classList.remove("openSell");
}

// открываем магазин по кнопке панели золота
BntOnGold.addEventListener("click", () => {
  showStore();
  setTimeout(() => {
    sell.classList.add("openSell");
    sell.classList.add("pullDown");
    buy.classList.remove("openBuy");
    soundsMenu.classList.remove("open-sounds-menu");
    sounds.src = "sounds/btn-store.mp3";
    sounds.play();
  }, 500);
});

store.addEventListener("click", storeOnClick);
function storeOnClick(e) {
  // нажимаем кнопку продать
  if (e.target === buttonSell) {
    sounds.src = "sounds/btn-store.mp3";
    sounds.play();
    sell.classList.add("openSell");
    sell.classList.add("pullDown");
    buy.classList.remove("openBuy");

    // нажимаем кнопку купить
  } else if (e.target === buttonBuy) {
    sounds.src = "sounds/btn-store.mp3";
    sounds.play();
    buy.classList.add("openBuy");
    buy.classList.add("pullDown");
    sell.classList.remove("openSell");
  }
}

//-----------меню Продать-----------//

// Кнопка в магазине переход в меню купить
toBuySmthBtn.addEventListener("click", () => {
  sounds.src = "sounds/btn-store.mp3";
  sounds.play();
  buy.classList.add("openBuy");
  buy.classList.add("pullDown");
  sell.classList.remove("openSell");
});

// Кнопка - выход из магазина
quitFromSell.addEventListener("click", showStore);

sell.addEventListener("click", onClickSellGoods);
function onClickSellGoods(e) {
  //увеличиваем в магазине количество воды на продажу
  if (e.target === plusWater && counterWaterStore < counter.getWaterCounter()) {
    counterWaterStore = changeNum(counterWaterStore, 0, 1);
  
    //уменьшаем в магазине количество воды на продажу
  } else if (e.target === minusWater && counterWaterStore > 0) {
    counterWaterStore = changeNum(counterWaterStore, 0, -1);
  }
  totalWater.textContent = counterWaterStore * price.getWaterPrice() + "";

  //продаем воду
  if (e.target === soldWater && counterWaterStore <= counter.getWaterCounter()) {

    counter.setWaterCounter(counter.getWaterCounter() - counterWaterStore);

    amountWater.textContent = counter.getWaterCounter() + "";
    amountWaterTop.textContent = counter.getWaterCounter() + "";

    goldSumm.set(goldSumm.get() + counterWaterStore * price.getWaterPrice());
    gold.textContent = goldSumm.get();
    sounds.src = "";

    // если воды на ферме осталось меньше, чем выбрано для продажи
    if (counterWaterStore > counter.getWaterCounter()) {
      counterWaterStore = counter.getWaterCounter();
      num[0].textContent = counterWaterStore + "";
      totalWater.textContent = counterWaterStore * price.getWaterPrice() + "";
      sounds.src = "sounds/sold.mp3";
      sounds.play();
    } else if (+num[0].textContent === 0) {
      onError(totalWater);
    }
  }

  //увеличиваем в магазине количество пшеницы на продажу
  if (e.target === plusWheat && counterWheatStore < counter.getWheatCounter()) {
    counterWheatStore = changeNum(counterWheatStore, 1, 1);

    //уменьшаем в магазине количество пшеницы на продажу
  } else if (e.target === minusWheat && counterWheatStore > 0) {
    counterWheatStore = changeNum(counterWheatStore, 1, -1);
  }
  totalWheat.textContent = counterWheatStore * price.getWheatPrice() + "";

  //продаем пшеницу
  if (e.target === soldWheat && counterWheatStore <= counter.getWheatCounter()) {
    counter.setWheatCounter(counter.getWheatCounter() - counterWheatStore);
    amountWheat.textContent = counter.getWheatCounter() + "";
    amountWheatTop.textContent = counter.getWheatCounter() + "";
    goldSumm.set(goldSumm.get() + counterWheatStore * price.getWheatPrice());
    gold.textContent = goldSumm.get();
    sounds.src = "";

    // если пшеницы на ферме осталось меньше, чем выбрано для продажи
    if (counterWheatStore > counter.getWheatCounter()) {
      counterWheatStore = counter.getWheatCounter();
      num[1].textContent = counterWheatStore + "";
      totalWheat.textContent = counterWheatStore * price.getWheatPrice() + "";
      sounds.src = "sounds/sold.mp3";
      sounds.play();
    } else if (+num[1].textContent === 0) {
      onError(totalWheat);
    }
  }

  //увеличиваем в магазине количество яиц на продажу
  if (e.target === plusEggs && counterEggsStore < counter.getEggsCounter()) {
    counterEggsStore = changeNum(counterEggsStore, 2, 1);

    //уменьшаем в магазине количество яиц на продажу
  } else if (e.target === minusEggs && counterEggsStore > 0) {
    counterEggsStore = changeNum(counterEggsStore, 2, -1);
  }
  totalEggs.textContent = counterEggsStore * price.getEggsPrice() + "";

  //продаем яйца
  if (e.target === soldEggs && counterEggsStore <= counter.getEggsCounter()) {
    counter.setEggsCounter(counter.getEggsCounter() - counterEggsStore);
    amountEggs.textContent = counter.getEggsCounter() + "";
    amountEggsTop.textContent = counter.getEggsCounter() + "";
    goldSumm.set(goldSumm.get() + counterEggsStore * price.getEggsPrice());
    gold.textContent = goldSumm.get();
    sounds.src = "";
    
    // если яиц на ферме осталось меньше, чем выбрано для продажи
    if (counterEggsStore > counter.getEggsCounter()) {
      counterEggsStore = counter.getEggsCounter();
      num[2].textContent = counterEggsStore + "";
      totalEggs.textContent = counterEggsStore * price.getEggsPrice() + "";
      sounds.src = "sounds/sold.mp3";
      sounds.play();
    } else if (+num[2].textContent === 0) {
      onError(totalEggs);
    }
  }
}

//-----------меню Купить-----------//

// Кнопка в магазине переход в меню продать
toSellSmthBtn.addEventListener("click", () => {
  sounds.src = "sounds/btn-store.mp3";
  sounds.play();
  sell.classList.add("openSell");
  sell.classList.add("pullDown");
  buy.classList.remove("openBuy");
});

// Кнопка - выход из магазина
quitFromBuy.addEventListener("click", showStore);

buy.addEventListener("click", onClickBuyBooster);

function onClickBuyBooster(e) {
  // покупаем улучшения воды
  if (e.target === buySpeedUpWater && goldSumm.get() >= priceSpeedUp.getWaterSpeedUpPrice()) {
    sounds.src = "sounds/getBoost.mp3";
    sounds.play();
    switchStepWater();
  } else if (
    e.target === buySpeedUpWater &&
    goldSumm.get() < priceSpeedUp.getWaterSpeedUpPrice()
  ) {
    onError(costSpeedUpWater);
  }

  // покупаем улучшение пшеницы
  if (e.target === buySpeedUpWheat && goldSumm.get() >= priceSpeedUp.getWheatSpeedUpPrice()) {
    sounds.src = "sounds/getBoost.mp3";
    sounds.play();
    switchStepWheat();
  } else if (
    e.target === buySpeedUpWheat &&
    goldSumm.get() < priceSpeedUp.getWheatSpeedUpPrice()
  ) {
    onError(costSpeedUpWheat);
  }

  // покупаем улучшение яиц
  if (e.target === buySpeedUpEggs && goldSumm.get() >= priceSpeedUp.getEggsSpeedUpPrice()) {
    sounds.src = "sounds/getBoost.mp3";
    sounds.play();
    switchStepEggs();
  } else if (
    e.target === buySpeedUpEggs &&
    goldSumm.get() < priceSpeedUp.getEggsSpeedUpPrice()
  ) {
    onError(costSpeedUpEggs);
  }
}


function waterSpeedUp(newStep, newPrice, text) {
  progressWater.style.width = "0%";
  progressBarWater = 0;
  step.setWaterStep(newStep);
  priceSpeedUp.setWaterSpeedUpPrice(newPrice);
  textSpeedUpWater.textContent = text;
  costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
}

function wheatSpeedUp(newStep, newPrice, text) {
  progressWheat.style.width = "0%";
  progressBarWheat = 0;
  step.setWheatStep(newStep);
  priceSpeedUp.setWheatSpeedUpPrice(newPrice);
  textSpeedUpWheat.textContent = text;
  costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
}

function eggsSpeedUp(newStep, newPrice, text) {
  progressEggs.style.width = "0%";
  progressBarEggs = 0;
  step.setEggsStep(newStep);
  priceSpeedUp.setEggsSpeedUpPrice(newPrice);
  textSpeedUpEggs.textContent = text;
  costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
}

function switchStepWater() {
  switch (step.getWaterStep()) {
    case 20:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWaterSpeedUpPrice());
      gold.textContent = goldSumm.get();
      waterSpeedUp(25, 300, "Серебряное ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 25:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWaterSpeedUpPrice());
      gold.textContent = goldSumm.get();
      waterSpeedUp(33.34, 500, "Золотое ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 33.34:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWaterSpeedUpPrice());
      gold.textContent = goldSumm.get();
      waterSpeedUp(50, 1000, "Платиновое ведро");
      costSpeedUpWater.textContent = priceSpeedUp.getWaterSpeedUpPrice() + "";
      break;
    case 50:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWaterSpeedUpPrice());
      gold.textContent = goldSumm.get();
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
}

function switchStepWheat() {
  switch (step.getWheatStep()) {
    case 20:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWheatSpeedUpPrice());
      gold.textContent = goldSumm.get();
      wheatSpeedUp(25, 600, "Хорошее удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 25:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWheatSpeedUpPrice());
      gold.textContent = goldSumm.get();
      wheatSpeedUp(33.34, 1500, "Отличное удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 33.34:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWheatSpeedUpPrice());
      gold.textContent = goldSumm.get();
      wheatSpeedUp(50, 2500, "Лучшее удобрение");
      costSpeedUpWheat.textContent = priceSpeedUp.getWheatSpeedUpPrice() + "";
      break;
    case 50:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getWheatSpeedUpPrice());
      gold.textContent = goldSumm.get();
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
}

function switchStepEggs() {
  switch (step.getEggsStep()) {
    case 20:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getEggsSpeedUpPrice());
      gold.textContent = goldSumm.get();
      eggsSpeedUp(25, 1500, "Хороший корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 25:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getEggsSpeedUpPrice());
      gold.textContent = goldSumm.get();
      eggsSpeedUp(33.34, 4000, "Отличный корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 33.34:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getEggsSpeedUpPrice());
      gold.textContent = goldSumm.get();
      eggsSpeedUp(50, 10000, "Лучший корм");
      costSpeedUpEggs.textContent = priceSpeedUp.getEggsSpeedUpPrice() + "";
      break;
    case 50:
      goldSumm.set(goldSumm.get() - priceSpeedUp.getEggsSpeedUpPrice());
      gold.textContent = goldSumm.get();
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
}

// отнимаем или прибавляем количество продуктов на продажу
function changeNum(counterStore, index, coef) {
  sounds.src = "sounds/tyk.mp3";
  sounds.play();
  counterStore = counterStore + coef;
  num[index].textContent = counterStore;
  return +num[index].textContent;
}

//закрыть панели меню по клику за границей панелей
document.addEventListener("click", closeAllPanels);
function closeAllPanels(e) {
  let target = e.target;
  if (
    target.closest(".container-store") === null &&
    e.target !== buttonStore &&
    e.target !== BntOnGold &&
    store.classList.contains("openStore")
  ) {
    showStore();
  } else if (
    target.closest("#sounds-menu") === null &&
    e.target !== soundMenuBtn &&
    soundsMenu.classList.contains("open-sounds-menu")
  ) {
    showSoundMenu();
  }
}