const div = document.querySelector('div#user')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    div.innerHTML = ''

    const user = document.querySelector('input#user').value

    findUser(user)
    findRepositories(user)
})

async function findUser(user) {
    try {
        const response_users = await fetch(`https://api.github.com/users/${user}`)

        const jsonFormatUsers = await response_users.json()

        show_user_data(jsonFormatUsers)
    } catch (error) {
        alert('erro ao consultar a API')
    }
}

function show_user_data(user) {
    try {
        if (user.login === undefined) {
            throw Error('usuario não encontrado')
        } else {
            const h3 = document.createElement('h3')
            h3.setAttribute('class', 'text-center')
            h3.innerHTML = `login: ${user.login}`
            console.log(user)

            const img = document.createElement('img')
            img.setAttribute('src', `${user.avatar_url}`)
            img.setAttribute('alt', 'foto do usuario')
            img.setAttribute('class', 'rounded mx-auto d-block w-25 p-3')

            const divFollowing = document.createElement('p')
            divFollowing.innerHTML = `seguindo: ${user.following}`
            divFollowing.setAttribute('style', 'float: left;')

            const divFollowers = document.createElement('p')
            divFollowers.innerHTML = `seguidores: ${user.followers}`
            divFollowers.setAttribute('style', 'float: right;')

            div.appendChild(divFollowing)
            div.appendChild(divFollowers)
            div.appendChild(h3)
            div.appendChild(img)
        }
    } catch (error) {
        div.innerHTML = `<p style="text-align: center;">${error.message}</p>`
    }
}

async function findRepositories(user) {
    try {
        const response_users = await fetch(`https://api.github.com/users/${user}/repos`)

        const jsonFormatRepos = await response_users.json()

        show_data_repositories(jsonFormatRepos)
    } catch (error) {
        alert('erro ao consultar a API')
    }
}

function show_data_repositories(repos) {
    try {
        const ul = document.querySelector('ul')
        ul.innerHTML = ''
        const h4 = document.querySelector('h4').style.display = 'inline'

        repos.map((repos) => {
            const li = document.createElement('li')

            li.innerHTML = `${repos.name}`

            ul.appendChild(li)
        })
        
    } catch (error) {
        const divRepositories = document.querySelector('div#repositories')

        divRepositories.innerHTML = 'nenhum repositório encontrado'
    }
}
