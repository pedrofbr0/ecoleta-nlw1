function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
       
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then( states => {
        // ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`
        // ufSelect.innerHTML += `<option value="1">Valor</option>`
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const stateInput = document.querySelector("input[name=state]")

    // console.log(event.target.value)

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then((res)=>{return res.json()})
    .then( cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    }) 

}

document.querySelector("select[name=uf").addEventListener(
    // "change", () => {console.log("ALOO")
    "change",getCities)
