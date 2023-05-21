const div = document.querySelector('div#user')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    div.innerHTML = ''

    const user = document.querySelector('input#user').value
    
    findUser(user)
})

async function findUser(user) {
   const response = await fetch(`https://api.github.com/users/${user}`)

   const jsonFormat = await response.json()

   showDatas(jsonFormat)
}

function showDatas(user) {
    const h3 = document.createElement('h3')
    h3.setAttribute('class', 'text-center')
    h3.innerHTML = `nome: ${user.name}`

    const img = document.createElement('img')
    img.setAttribute('src', `${user.avatar_url}`)
    img.setAttribute('alt', 'foto do usuario')
    img.setAttribute('class', 'rounded mx-auto d-block w-25 p-3')

    div.appendChild(h3)
    div.appendChild(img)
}
