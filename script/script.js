const div = document.querySelector('div#user')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    div.innerHTML = ''

    const user = document.querySelector('input#user').value
    
    findUser(user)
})

async function findUser(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`)

        const jsonFormat = await response.json()

        showDatas(jsonFormat)
    } catch (error) {
        alert('erro ao consultar a API')
    }
}

function showDatas(user) {
    try {
        if (user.name === undefined) {
            throw Error('usuario não encontrado')
        } else {
            const h3 = document.createElement('h3')
            h3.setAttribute('class', 'text-center')
            h3.innerHTML = `nome: ${user.name}`

            const img = document.createElement('img')
            img.setAttribute('src', `${user.avatar_url}`)
            img.setAttribute('alt', 'foto do usuario')
            img.setAttribute('class', 'rounded mx-auto d-block w-25 p-3')

            const a = document.createElement('a')
            a.setAttribute('href', '.././pages/repositorios.html')

            const button = document.createElement('button')
            button.innerHTML = 'ver repositórios'
            button.setAttribute('class', 'btn btn-success mx-auto d-block ')
            
            a.appendChild(button)
            
            div.appendChild(h3)
            div.appendChild(img)
            div.appendChild(a)
        }
    } catch (error) {
        alert(error.message)
    }
}
