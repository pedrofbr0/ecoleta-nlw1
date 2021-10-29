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

    const stateInput = document.querySelector("[name=state]")

    // console.log(event.target.value)

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    

    citySelect.innerHTML="<option>Selecione a cidade</option>" // ***o melhor a se fazer é limpar o campo logo antes da chamada do fecth

    citySelect.disabled = true //bloqueia novamente  a cidade enquanto o estado não é selecionado

    fetch(url)
    .then((res)=>{return res.json()})
    .then( cities => {
        // citySelect.innerHTML = "" 
        
        //limpar o campo de cidades antes de preencher novamente,
        //pois com a lógica atual, as cidades de todos os estados previamente selecionados
        //estão sendo carregadas

        for(const city of cities) {
            // citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //Passa para o formulário
            //não a id da cidade, mas sim a cidade
        }

        citySelect.disabled = false
    }) 

}

document.querySelector("select[name=uf").addEventListener(
    // "change", () => {console.log("ALOO")
    "change",getCities)

// Dinamização dos items de coleta

// Selecionando TODOS as tags "li" dos itens
const itemsToCollect = document.querySelectorAll(".items-grid li")   

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


let selectedItems = [] // Vai armazenar quais itens são selecionados

const collectedItems = document.querySelector("input[name=items]") // Acessando o Input Hidden dos itens


// Estabeleci que cada item possui um event listener que, ao ser clicado,
// executará a função handleSelectedItem

function handleSelectedItem(event) {
    // console.log(event.target)
    // console.log(event.target.dataset.id)
    // const itemId = event.target.dataset.id
    const itemLi = event.target

    const itemId = itemLi.dataset.id

    console.log(itemId)

    // adicionar ou remover classe no html com js

    // if(itemLi.classList.contains('selected') == true) {
    //     itemLi.classList.remove('selected')
    // } else {
    //     itemLi.classList.add('selected')  
    // }

    itemLi.classList.toggle("selected")
    //toggle() adicione ou remove se o elemento não existe ou já existe, respectivament

    //Passando os itens selecionados para o BackEnd:

    // Verificar se existem itens selecionados, se sim, armazená-los
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
    // A função findIndex itera sobre o elemento acessado verificando se a função passada para
    // ela é verdadeira ou falsa. Se for verdade, retorna a posição do elemento. Se não, -1

    // Se já estiver selecionado:
    if(alreadySelected >= 0) {
        // Remover da seleção
        const filteredItems = selectedItems.filter( item => {
        // A função filter itera sobre o elemebto acessado avaliando a função passada. Os elementos
        // que forem avaliados como verdadeiros serão mantidos, os que não, serão removidos.
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        // Adiciona à seleção
        selectedItems.push(itemId)
    }

    // Depois, basta atualizar o hidden input com os itens
    collectedItems.value = selectedItems

}


// Inclusive todos os filhos dos "li" receberam um event listener, assim, clicando-se na imag em
// ou no texto obeteremos as tags respectivas  
// Posso evitar esse click nos filhos de um elemento no próprio css