const deleteCardForm = document.querySelector('#deleteCardBtn')

if (deleteCardForm) {
	deleteCardForm.addEventListener('click', async (event) => {
		const response = await fetch(`/card/${event.target.dataset.cardid}`, {
			method: 'DELETE'
		});
		const responseJson = await response.json();

	  if (response.ok) {
		event.target.closest('.card__item').remove();
	  }
	})
}