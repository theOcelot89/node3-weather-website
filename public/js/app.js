const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTWo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'loading...'
    messageTWo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then(({error,location,forecast}) => {
            if (error) {
                return messageOne.textContent = error
            }
            messageOne.textContent = location
            messageTWo.textContent = forecast       
        })
    })
    
})

