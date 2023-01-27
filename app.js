function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const init = () => {
  //get the avatar
  const avatar = document.querySelector("#avatar");

  //get the coin
  const coin = document.querySelector("#coin");

  moveCoin();
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      move(avatar, 50, "down");
    } else if (e.key === "ArrowUp") {
      move(avatar, 50, "up");
    } else if (e.key === "ArrowRight") {
      move(avatar, 50, "right");
    } else if (e.key === "ArrowLeft") {
      move(avatar, 50, "left");
    }

    if (isTouching(avatar, coin)) {
      const coinaudio = document.getElementById("coin_audio");
      moveCoin();
      coinaudio.play();

      const count = document.querySelector(".count");
      let number = parseInt(count.textContent);

      number++;
      count.innerHTML = number;
    }
  });
};

const move = (element, amount, direction) => {
  const currTop = extractPos(element.style.top);
  const currLeft = extractPos(element.style.left);

  if (direction === "down") {
    if (currTop >= innerHeight) {
      return;
    }
    element.style.top = `${currTop + amount}px`;
  } else if (direction === "up") {
    if (currTop <= 0) {
      return;
    }
    element.style.top = `${currTop - amount}px`;
  } else if (direction === "right") {
    if (currLeft >= innerWidth) {
      return;
    }
    element.style.left = `${currLeft + amount}px`;
    element.style.transform = "scaleX(1) translateX(-50px)";
  } else if (direction === "left") {
    if (currLeft <= 0) {
      return;
    }
    element.style.left = `${currLeft - amount}px`;
    element.style.transform = "scaleX(-1)";
  }
};

const extractPos = (position) => {
  if (!position) return 100;
  return parseInt(position.slice(0, -2));
};

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  // const y = ?
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
  // coin.style.?? = ??
};

init();
