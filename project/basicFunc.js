// API Movie (from: https://ophim1.cc/api-document)
let page = 1
let searchName = ''
let apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`
let searchApi = `https://ophim1.cc/_next/data/x5eGH4wObN-EpnueF2sPG/tim-kiem.json?keyword=${searchName}`
const postContainer = document.querySelector('.post-container')
const pageNumber = document.querySelector('.page-number')

const getData= async(url)=>{
    const response = await fetch(url)
    if(response.status===200){
        const movieData = await response.json()
        // console.log(movieData)
        return movieData
    }
}
async function init(){
    const data = await getData(apiPage)
    await renderPage(data)
    // createBoxEvent()
}
init()


// menu
const menuBtn = document.querySelector('.menu-icon')
const menuOpen = document.querySelector('.menu')
menuBtn.addEventListener('click', handleMenu)
function handleMenu(){
    menuOpen.classList.toggle('active')
}

// scroll progress bar
let handleScrollBar=()=>{
    let scrollProgress = document.getElementById('progress')
    let pos = document.documentElement.scrollTop
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrollValue = Math.round(pos * 100 / calcHeight)
    scrollProgress.style.background = `conic-gradient(#4e50ff ${scrollValue}%, #DFDFDE ${scrollValue}%)`
}
window.onscroll = handleScrollBar
window.onload = handleScrollBar


// fixed menu btn when scroll
window.onscroll = function(){
    let pos = document.documentElement.scrollTop
    let navbar = document.querySelector('.navbar')
    if(pos > 20){
        navbar.classList.add('fix-icon')
    }else{
        navbar.classList.remove('fix-icon')
    }
}


// search
const slider = document.querySelector('#main-slider')
const searchInput = document.querySelector('.search-input')
searchInput.addEventListener('keypress', async(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault()
        let name = e.target.value.split(' ').join('+').toLowerCase()
        const searchFilms = await getData(`https://ophim1.cc/_next/data/x5eGH4wObN-EpnueF2sPG/tim-kiem.json?keyword=${name}`)
        console.log(searchFilms)
    }
})




// render movie page---------------------------------------------
// switch movie list
// init list number
function createListNum(){
    pageNumber.innerHTML=''
    for(let i = 1 ; i < 10; i++){
        const a = document.createElement('a')
        if(page == i){
            a.classList.add('page-active')
        }
        a.setAttribute('href', i)
        a.setAttribute('id', i)
        a.textContent = i
        pageNumber.appendChild(a)
    }
    const a = pageNumber.querySelectorAll('a')
    a.forEach((atag)=>{
        atag.addEventListener('click',(e)=>{
            e.preventDefault()
            if(page !== atag.id){
                page = atag.id
                handlePageChoose()
                window.scrollTo(0, 0);
            }
        })
    })
}
async function handlePageChoose(id){
    apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`
    const data = await getData(apiPage)
    await renderPage(data)
}



// movie click




// function createBoxEvent(){
//     const postBoxes = document.querySelectorAll('.post-box')
//     console.log(postBoxes)
//     postBoxes.forEach((movie)=>{
//         movie.addEventListener('click',()=>{
//             const slugData = movie.className.split(' ')[1]
//             console.log(1)
//         })
//     })
// }








// function catchImgError(url){
//     var test = new Image
// }
async function renderPage(data){
    const listFilm = data.items
    // console.log(listFilm)
    postContainer.innerHTML=''
    await listFilm.forEach(async(film)=>{
        const slug = film.slug
        const movieData = await getData(`https://ophim1.com/phim/${slug}`)
        const movie = movieData.movie
        let postBox = `
            <div class="post-box ${movie.slug}">
                <div class="main-slider-overplay">
                    <ion-icon name="play" class="play-movie-icon"></ion-icon>
                </div>
                <img src='${movie.poster_url}' alt="">
                <div class="main-slider-text">
                    <span class="quality">${movie.quality}</span>
                    <div class="bottom-text">
                        <div class="movie-name">
                            <span>${movie.year}</span>
                            <strong>${movie.origin_name}</strong>
                        </div>
                        <div class="lang-status">
                            <span>${movie.lang}</span>
                            <span>${movie.status}</span>
                        </div>
                    </div>
                </div>
            </div>

        `
        postContainer.insertAdjacentHTML('beforeEnd', postBox)
    })
    createListNum()
    
}
