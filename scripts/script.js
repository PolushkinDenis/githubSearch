let form = document.forms[0];

const data = [
    {id: 1, url: "https://github.com/chvin/react-tetris", language:"HTML", count: 123, name: "Tetris", login: "Denis", description: "A simple javascript tetris game"}
]

const searchRepository = async (text) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${text}`)
    const result = await response.json();
    console.log(result)
    if(result.total_count === 0) {
        nothingFound()
    }
    else {
        if(result.items.length > 10) {
            for(let i = 0; i < 10; i++){
                addRepositoryOnDOM(result.items[i])
            }
        }
        else {
            result.items.map(item => {
                addRepositoryOnDOM(item)
            })
        }
    } 
}

const addError = (input) => {
    const parent = input.parentNode
    const errorText = document.createElement('label')
    errorText.textContent = "Строка поиска должна быть больше 2"
    errorText.classList.add('error__text')
    parent.append(errorText)
    input.classList.add('error')
}

const removeError = (input) => {
    const parent = input.parentNode
    if (parent.querySelector('.error__text')) {
        parent.querySelector('.error__text').remove()
        input.classList.remove('error')
    }
}

const removeAllRepositiry = () => {
    const repositoryList = document.querySelector(".repository__list")
    repositoryList.innerHTML = ""
}

const nothingFound = () => {
    const repositoryList = document.querySelector(".repository__list")
    const empty = document.createElement("div")
    empty.innerHTML = "Ничего не найдено"
    repositoryList.append(empty)
}

const addRepositoryOnDOM = (repo) => {
    const repositoryList = document.querySelector(".repository__list")
    const repository = document.createElement("div")
    const repository_img_div = document.createElement("div")
    const repository_img = document.createElement("img")
    const repository_content = document.createElement("div")
    const repository_name = document.createElement("a")
    const discription = document.createElement("p")
    const content_optionally = document.createElement("div")
    const star_img = document.createElement("img")
    const star_count = document.createElement("p")
    const content_language = document.createElement("div")
    const content_owner = document.createElement("div")

    repository.classList.add("repository")
    repository_img_div.classList.add("repository__img")

    repository_img.setAttribute("src", "./images/repository.png");
    repository_img.setAttribute("alt", "repositiry");

    repository_content.classList.add("repository__content")

    repository_name.setAttribute("href", repo.html_url)
    repository_name.setAttribute("target", "_blank")
    repository_name.innerHTML = repo.name

    discription.classList.add("discription")
    discription.innerHTML = repo.description

    content_optionally.classList.add("content__optionally")

    star_img.setAttribute("src", "./images/star.png")
    star_count.innerHTML = repo.stargazers_count

    content_language.classList.add("content__language")
    content_language.innerHTML = repo.language
    content_owner.classList.add("content__owner")
    content_owner.innerHTML = repo.owner?.login

    repository_img_div.innerHTML = repository_img.outerHTML
    content_optionally.innerHTML = star_img.outerHTML + star_count.outerHTML + content_language.outerHTML + content_owner.outerHTML
    repository_content.innerHTML = repository_name.outerHTML + discription.outerHTML + content_optionally.outerHTML

    repository.innerHTML = repository_img_div.outerHTML + repository_content.outerHTML
    repositoryList.append(repository)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let inputText = form.elements.search__text;
    console.log(inputText.value)
    if (inputText.value.length < 2) {
        addError(inputText)
        setTimeout(() => {
            removeError(inputText)
        }, 2000)
    }
    else {
        removeAllRepositiry()
        searchRepository(inputText.value)
    }
})

// searchRepository()