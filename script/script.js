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
        const response_users = await fetch(`https://api.github.com/users/${user}`)
        const response_repositories = await fetch(`https://api.github.com/users/${user}/repos`)

        const jsonFormatUsers = await response_users.json()
        const jsonFormatRepos = await response_repositories.json()

        console.log(jsonFormatRepos)
        showDatas(jsonFormatUsers)
        show_repositories(jsonFormatRepos)
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

            div.appendChild(h3)
            div.appendChild(img)
        }
    } catch (error) {
        alert(error.message)
    }
}

function show_repositories(repos) {
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    const h4 = document.querySelector('h4').style.display = 'inline'

    try {
        repos.map((repos) => {
            const li = document.createElement('li')

            li.innerHTML = `${repos.name}`

            ul.appendChild(li)
        })
        
    } catch (error) {
        alert(error.message)
    }
}
