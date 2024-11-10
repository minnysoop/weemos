const header = document.querySelector('header')
const main = document.querySelector('main')
const stack = document.getElementById('stack')

// Generate a a post ID based on the number of posts
let countID = localStorage.getItem("counterID")
if (countID === null) {
    localStorage.setItem("counterID", 0)
}

// Post Object
class Post {
    constructor(id, content) {
        this.id = id
        this.content = content

        // Create container
        this.container = document.createElement("div")
        this.container.setAttribute("id", this.id)
        this.container.classList.add("post-it")

        // Create text area
        this.textarea = document.createElement("textarea")
        this.textarea.value = this.content
        this.textarea.addEventListener("keyup", (e) => {this.updateContent(e)})

        // Create a delete button
        this.remove = document.createElement("button")
        this.remove.innerHTML = "Delete"
        this.remove.addEventListener("click", (e) => {this.removeSelf(this.id)})

        // Combine it all together
        this.container.appendChild(this.textarea)
        this.container.appendChild(this.remove)
    }

    // Update content on the front end and back end
    updateContent(e){
        let posts_json = JSON.parse(localStorage.getItem("posts"))
        posts_json[this.id] = e.target.value
        localStorage.setItem("posts", JSON.stringify(posts_json))
    }

    setContent(newContent){
        this.content = newContent
    }

    getContent(){
        return this.content
    }

    getID(){
        return this.id
    }

    // Remove posts from the front end and back end
    removeSelf(id){
        let posts_json = JSON.parse(localStorage.getItem("posts"))
        const postToRemove = document.getElementById(id)
        delete posts_json[this.id]
        localStorage.setItem("posts", JSON.stringify(posts_json))
        postToRemove.remove()
    }
}

const createNewPostButton = document.createElement("button")
createNewPostButton.innerHTML = "new"
createNewPostButton.addEventListener('click', (e) => {
    // Generate new ID for the post being created
    let new_id = parseInt(localStorage.getItem("counterID"))
    const newPost = new Post(new_id++, "")
    localStorage.setItem("counterID", new_id++)

    // Create the new post
    let posts_json = JSON.parse(localStorage.getItem("posts"))
    posts_json[newPost.getID()] = newPost.getContent()
    localStorage.setItem("posts", JSON.stringify(posts_json))

    // Append the post to the stack
    stack.appendChild(newPost.container)
})

// When the website loads
onload = (e) => {
    const posts = localStorage.getItem("posts")
    // Create posts in local storage if there isn't any
    if (posts === null){
        let seed = {}
        localStorage.setItem("posts", JSON.stringify(seed))
    }

    // Get the posts from local storage
    const posts_json = JSON.parse(localStorage.getItem("posts"))
    // Create new posts for the existing posts
    for (const key in posts_json) {
        retrievedPost = new Post(key, posts_json[key])
        stack.appendChild(retrievedPost.container)
    }
}


// Create info pop up text
let infoPop = document.createElement("div")
infoPop.setAttribute("id", "info-text")
infoPop.style.display = "none"
infoPop.innerHTML = "To create a new post it note, click the \"new\" button. All posts are stored in your browser's cache."

// Create info link
let showInfo = false
let infoLink = document.createElement("img")
infoLink.setAttribute("id", "info")
infoLink.setAttribute("src", "./assets/info-icon.png")
infoLink.setAttribute("alt", "click for more info")
infoLink.setAttribute("width", "25px")
infoLink.addEventListener("click", (e) => {
    if (infoPop.style.display === "none") {
        infoPop.style.display = "inline"
    }
    else {
        infoPop.style.display = "none"
    }
})

// Create header
header.classList.add("banner")
header.appendChild(createNewPostButton)
header.appendChild(infoLink)
header.appendChild(infoPop)