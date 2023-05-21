const div = document.querySelector('div.card')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = document.querySelector('input#user').value
    
    findUser(user)
})

async function findUser(user) {
   const response = await fetch(`https://api.github.com/users/${user}`)

   const jsonFormat = await response.json()
}