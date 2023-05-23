const div = document.querySelector('div#user')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    div.innerHTML = ''

    const user = document.querySelector('input#user')
    let userFormatUrl = String(user.value).replace(' ', '+')

    findUser(userFormatUrl)
    findRepositories(userFormatUrl)
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
            createElementsUser(user)
        }
    } catch (error) {
        div.innerHTML = `<p style="text-align: center;">${error.message}</p>`
    }
}

function createElementsUser(DatasUser) {
    const h3 = document.createElement('h3')
    h3.setAttribute('class', 'text-center')
    h3.innerHTML = `login: ${DatasUser.login}`

    const img = document.createElement('img')
    img.setAttribute('src', `${DatasUser.avatar_url}`)
    img.setAttribute('alt', 'foto do usuario')
    img.setAttribute('class', 'rounded mx-auto d-block w-25 p-3')

    const divFollowing = document.createElement('p')
    divFollowing.setAttribute('style', 'float: left;')
    divFollowing.innerHTML = `seguindo: ${DatasUser.following}`

    const divFollowers = document.createElement('p')
    divFollowers.setAttribute('style', 'float: right;')
    divFollowers.innerHTML = `seguidores: ${DatasUser.followers}`

    div.appendChild(divFollowing)
    div.appendChild(divFollowers)
    div.appendChild(h3)
    div.appendChild(img)
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

function show_data_repositories(DatasRepositories) {
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    const h4 = document.querySelector('h4')
    h4.style.display = 'inline'

    try {

        createElementsRepositories(DatasRepositories, ul)
        
    } catch (error) {
        const divRepositories = document.querySelector('div#repositories')

        divRepositories.innerHTML = 'nenhum repositório encontrado'
    }
}

function createElementsRepositories(repos, ul) {
    repos.map((repos) => {
        const li = document.createElement('li')
    
        li.innerHTML = `${repos.name}`
    
        ul.appendChild(li)
    })
}