const celle = function () {
  const contenitore = document.getElementById("cell")

  for (let i = 0; i < 32; i++) {
    const cella = document.createElement("div")
    cella.classList.add("cella")
    contenitore.appendChild(cella)
  }
}

let immaginiMescolate = []
let immaginiDisponibili = [
  "https://placedog.net/200/200?random=1",
  "https://placedog.net/200/200?random=2",
  "https://placedog.net/200/200?random=3",
  "https://placedog.net/200/200?random=4",
  "https://placedog.net/200/200?random=5",
  "https://placedog.net/200/200?random=6",
  "https://placedog.net/200/200?random=7",
  "https://placedog.net/200/200?random=8",
  "https://placedog.net/200/200?random=9",
  "https://placedog.net/200/200?random=10",
  "https://placedog.net/200/200?random=11",
  "https://placedog.net/200/200?random=12",
  "https://placedog.net/200/200?random=13",
  "https://placedog.net/200/200?random=14",
  "https://placedog.net/200/200?random=15",
  "https://placedog.net/200/200?random=16",
]

const iniziaGioco = function () {
  immaginiMescolate = [...immaginiDisponibili, ...immaginiDisponibili]
  immaginiMescolate = immaginiMescolate.sort(() => Math.random() - 0.5)

  const celle = document.querySelectorAll(".cella")
  celle.forEach((cella, index) => {
    cella.innerHTML = ""
    const img = document.createElement("img")
    img.src = immaginiMescolate[index]
    img.classList.add("hidden")
    img.dataset.index = index
    cella.appendChild(img)
  })

  gestisciClick() // Aggancia gli eventi DOPO aver creato le immagini
}

let primaScelta = null
let secondaScelta = null
let bloccaClick = false

const gestisciClick = function () {
  const celle = document.querySelectorAll(".cella")

  celle.forEach((cella) => {
    cella.addEventListener("click", (event) => {
      if (bloccaClick) return

      const img = event.currentTarget.querySelector("img")
      if (!img || img.classList.contains("revealed")) return

      img.classList.remove("hidden")
      img.classList.add("revealed")

      if (!primaScelta) {
        primaScelta = img
      } else {
        secondaScelta = img
        bloccaClick = true

        if (primaScelta.src === secondaScelta.src) {
          primaScelta = null
          secondaScelta = null
          bloccaClick = false
        } else {
          setTimeout(() => {
            primaScelta.classList.remove("revealed")
            primaScelta.classList.add("hidden")
            secondaScelta.classList.remove("revealed")
            secondaScelta.classList.add("hidden")
            primaScelta = null
            secondaScelta = null
            bloccaClick = false
          }, 1000)
        }
      }
    })
  })
}

const resettaGioco = function () {
  document.getElementById("inizia").disabled = false
  immaginiMescolate = []
  const celle = document.querySelectorAll(".cella")
  celle.forEach((cella) => {
    cella.innerHTML = ""
  })
}

document.getElementById("inizia").addEventListener("click", function () {
  iniziaGioco()
})

celle()
