const closeModal = document.querySelector("#modal .header a")
const modal = document.querySelector("#modal")
const buttonSearch = document.querySelector("#page-home main a")


buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closeModal.addEventListener("click", () => {
    modal.classList.add("hide")
})