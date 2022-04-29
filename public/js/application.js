const deleteCardForm = document.querySelector('.card__list')
// const editCardForm = document.querySelector('#editCardBtn')
deleteCardForm?.addEventListener('click', async (event) => {
	const button = event.target.dataset.type;
	if (button === 'delete') {
		event.preventDefault()
		let id = event.target.closest('div').dataset.cardid
	   const response = await fetch(`/card/${id}`, {
			method: 'delete'
		});
		
	  if (response.ok) {
	    event.target.closest('.card__item').remove();
	  }
	};
});