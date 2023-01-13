const slug = localStorage.getItem("slug")
let apiFilm = `https://ophim1.com/phim/${slug}`


const bannerImg = document.querySelector('.banner-img-tag')
const bannerTitle = document.querySelector('.banner-title')
const quality = document.querySelector('.quality')
const releaseYear = document.querySelector('.release-year')
const episode = document.querySelector('.episode')
const lang = document.querySelector('.lang')
const summary = document.querySelector('.summary')
const category = document.querySelector('.category')

// movie screen (close)
const movieModal = document.querySelector('#play')
const iframe = movieModal.querySelector('.movie-screen')
movieModal.addEventListener('click', handleClose)
function handleClose(){
    movieModal.classList.toggle('open')
    iframe.setAttribute('src', '')
}

const getData= async(url)=>{
    const response = await fetch(url)
    if(response.status===200){
        const movieData = await response.json()
        // console.log(movieData)
        return movieData
    }
}
async function init(){
    const movie = await getData(apiFilm)
    const film = movie.movie
    let img = film.poster_url
    if(!film.poster_url){
        img = film.thumb_url
    }
    bannerImg.setAttribute('src',img)
    bannerTitle.textContent = film.name
    quality.textContent = film.quality
    releaseYear.textContent = film.year
    episode.textContent = film.episode_current
    lang.textContent = film.lang
    summary.innerHTML = `${film.content}`
    category.innerHTML=''
    for(const cate of film.category){
        const span = document.createElement('span')
        span.textContent = cate.name
        category.appendChild(span)
    }
}
init()


// watchbtn
const watchBtn = document.querySelector('.watch-btn')
watchBtn.addEventListener('click', handleWatch)
async function handleWatch(){
    movieModal.classList.toggle('open')
    const movie = await getData(apiFilm)
    const ep = movie.episodes[0].server_data[0].link_embed
    console.log(ep)
    iframe.setAttribute('src', ep)
}
