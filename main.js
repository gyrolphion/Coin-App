const coinlistesi = document.querySelector(".coins");
const formId = document.getElementById("formId");
const arama = document.querySelector(".search");

const url = "https://api.coinranking.com/v2/coins";
function CoinGet() {
  fetch("https://api.coinranking.com/v2/coins")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.data.coins);
      const allcoinler = data.data.coins;
      tumcoinler = allcoinler;
      // coinshow(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
CoinGet();
const coinshow = (a) => {
  a.forEach((value) => {
    const { name, symbol, price, iconUrl, change, color } = value;

    if (!coinlistesi.innerHTML.includes(name)) {
      coinlistesi.innerHTML += ` <li class="coin">
            <div class="remove-icon">
            <i class="fas fa-window-close"></i>
            </div>
            <h2 class="coin-name" data-name="${name}"><span>${name}</span><sup>${symbol}</sup></h2>
            <div class="coin-temp">$ ${Number(price).toFixed(3)}</div>
            <figure>
            <img class="coin-icon" src="${iconUrl}" alt="" />
            <figcaption class="change"> <i class="fa-solid fa-chart-line"></i> <span class="oran">${change}</span>%</figcaption></figure>
                
            </li>`;
    }
  });
};
formId.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!arama.value) {
    alert("Aramak istediğiniz Coin adını giriniz.");
  } else {
    const filtreCoin = tumcoinler.filter((c) =>
      c.name.toLowerCase().includes(arama.value.toLowerCase())
    );

    coinshow(filtreCoin);
    renk();
  }
});

function renk() {
  const oran = document.querySelectorAll(".oran");
  oran.forEach((f) => {
    if (f.textContent >= 0) {
      f.closest(".change").style.color = "green";
      f.style.color = "darkgreen";
    } else {
      f.closest(".change").style.color = "red";

      f.style.color = "red";
    }
  });
}

coinlistesi.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-window-close")) {
    e.target.closest(".coin").remove();
  }
});
