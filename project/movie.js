let slug = localStorage.getItem("slug")
let apiFilm = `https://ophim1.com/phim/${slug}`
let movie = null

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
const episodes = document.querySelector('.episodes')
episodes.addEventListener('click', function(event){
    event.stopPropagation()
})

// get data from api
const getData= async(url)=>{
    const response = await fetch(url)
    if(response.status===200){
        const movieData = await response.json()
        // console.log(movieData)
        return movieData
    }
}

async function init(){
    const movieData = await getData(apiFilm)
    movie = movieData
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
    renderEpisodes(movie)
    const ep = movie.episodes[0].server_data[0].link_embed
    iframe.setAttribute('src', ep)
}


const epContainer = document.querySelector('.episodes-container')
function renderEpisodes(movie){
    epContainer.innerHTML = ''
    const epList = movie.episodes[0].server_data
    epList.forEach((ep)=>{
        const epTag = document.createElement('div')
        epTag.className = `ep ${ep.slug}`
        epTag.textContent = ep.name
        epTag.addEventListener('click',()=>{
            iframe.setAttribute('src', ep.link_embed)
        })
        epContainer.appendChild(epTag)
    })
}

// search ep
const searchInput =  document.querySelector('.search-input')
searchInput.addEventListener('keypress', async(e)=>{
    if(e.key === 'Enter'){
        epContainer.innerHTML = ''
        const epsData = movie.episodes[0].server_data
        epsData.forEach((ep)=>{
            if(ep.slug.includes(e.target.value)){
                const epTag = document.createElement('div')
                epTag.className = `ep ${ep.slug}`
                epTag.textContent = ep.name
                epTag.addEventListener('click',()=>{
                    iframe.setAttribute('src', ep.link_embed)
                })
                epContainer.appendChild(epTag)
            }
        })
    }
    if(!e.target.value){
        renderEpisodes(movie)
    }
})