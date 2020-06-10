const selectUf = document.querySelector('select[name=uf]');
const selectCity = document.querySelector('select[name=city]')
const stateInput = document.querySelector('input[name=state]')
const inputItems = document.querySelector('input[name=items]')
const inputCep = document.querySelector('input[name=cep]')
const inputAddress1 = document.querySelector('input[name=address');
const inputAddress2 = document.querySelector('input[name=address2]');


function getAddress() {
    const CEP = inputCep.value;

    if (CEP.length >= 8) {
        const validCEP = CEP.replace("-", "");
        console.log(validCEP);

        fetch(`https://viacep.com.br/ws/${CEP}/json`)
            .then(res => res.json())
            .then(address => {

                inputAddress1.value = "";
                inputAddress2.value = "";

                inputAddress1.value = `${address.logradouro}, ${address.bairro}`;
                inputAddress2.value = `${address.complemento}`;

            }).catch(err => {
                alert('CEP Inválido');
            })
    }
}


function populateUFs() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                selectUf.innerHTML += `<option value="${state.id}">${state.nome}</option>`
                stateInput.value = `${state.nome}`;
            }
        })
}

function getCities(event) {
    const valorUf = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valorUf}/municipios`

    const selectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[selectedState].innerText;

    selectCity.innerHTML = '<option value>Selecione a Cidade</option>';
    selectCity.disabled = true;


    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {
                selectCity.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            selectCity.disabled = false;
        })
}

populateUFs();
selectUf.addEventListener('change', getCities)
inputCep.addEventListener('change', getAddress);


const itemsToColect = document.querySelectorAll('.items-grid li');

let selectedItems = [];

for (const item of itemsToColect) {
    item.addEventListener('click', (event) => {
        item.classList.toggle('selected-item')
        const itemID = event.target.dataset.id;

        const alreadySelected = selectedItems.findIndex(item => {
            return item == itemID;
        })

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => {
                return item != itemID;
            })

            selectedItems = filteredItems;
        } else {
            selectedItems.push(itemID);
        }


        inputItems.value = selectedItems;

    })
}



