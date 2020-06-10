const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const CloseModal = document.querySelector('#modal .header a');


buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide');
})

CloseModal.addEventListener('click', () => {
    modal.classList.add('hide');
})