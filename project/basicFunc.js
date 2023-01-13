// API Movie (from: https://ophim1.cc/api-document)
let page = 1
let searchPage = 1
let searchName = ''
let isSearching = false
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
    localStorage.clear()
    const data = await getData(apiPage)
    mainSlider(data)
    renderList(data)
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
        isSearching = true
        searchPage = 1
        let name = e.target.value.split(' ').join('+').toLowerCase()
        searchApi = `https://ophim1.cc/_next/data/x5eGH4wObN-EpnueF2sPG/tim-kiem.json?keyword=${name}`
        const searchFilms = await getData(searchApi)
        const films = searchFilms.pageProps.data
        // console.log(films)
        const slider = document.querySelector('#main-slider')
        slider.innerHTML = ''
        const heading = document.querySelector('.title-heading')
        heading.innerHTML = '<h1>Results</h1>'
        renderList(films)
        createListNum(searchPage)
    }  
})

// render movie page---------------------------------------------
// switch movie list
// init list number
function createListNum(num){
    pageNumber.innerHTML=''
    for(let i = 1 ; i < 20; i++){
        const a = document.createElement('a')
        if(num == i){
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
            if(isSearching){
                if(searchPage !== atag.id){
                    searchPage = atag.id
                    handlePageChoose()
                    window.scrollTo(0, 0);
                }
            }else
            if(page !== atag.id){
                page = atag.id
                handlePageChoose()
                window.scrollTo(0, 0);
            }
        })
    })
}
async function handlePageChoose(){
    if(isSearching){
        searchApi = `${searchApi}&page=${searchPage}`
        console.log(searchApi)
        const dataSearch = await getData(searchApi)
        renderList(dataSearch.pageProps.data)
    }else{
        apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`
        const dataPage = await getData(apiPage)
        renderList(dataPage)
    }
}


// function catchImgError(url){
//     var test = new Image
// }
 async function renderList(data){
    const listFilm = data.items
    // console.log(listFilm)
    postContainer.innerHTML=''
    listFilm.forEach(async(film)=>{
        const slug = film.slug
        const movieData = await getData(`https://ophim1.com/phim/${slug}`)
        const movie = movieData.movie
        // console.log(movie)
        let img = movie.poster_url
        if(!movie.poster_url){
            img = movie.thumb_url
        }
        const a = document.createElement('a')
        a.setAttribute('href','movie.html')
        a.classList.add(`${movie.slug}`)
        let postBox = `
            <div class="post-box ">
                <div class="main-slider-overplay">
                    <ion-icon name="play" class="play-movie-icon"></ion-icon>
                </div>
                <img src='${img}' alt="">
                <div class="main-slider-text">
                    <span class="quality">${movie.quality}</span>
                    <div class="bottom-text">
                        <div class="movie-name">
                            <span>${movie.year}</span>
                            <strong>${movie.name}</strong>
                        </div>
                        <div class="lang-status">
                            <span>${movie.lang}</span>
                            <span>${movie.status}</span>
                        </div>
                    </div>
                </div>
            </div>

        `
        a.innerHTML = postBox
        a.addEventListener('click',(e)=>{
            e.preventDefault()
            localStorage.setItem("slug", a.className)
            window.location.href = 'movie.html'
        })
        postContainer.appendChild(a)
    })
    if(isSearching){
        createListNum(searchPage)
    }else{
        createListNum(page)
    }
}



// slider films
const swiperWrapper = document.querySelector('.swiper-wrapper')
async function mainSlider(data){
    const slide = document.querySelectorAll('.swiper-slide')
    const imgSlide = document.querySelectorAll('#img-slide')
    const qualitySlide = document.querySelectorAll('.quality-slide')
    const yearSlide = document.querySelectorAll('.year-slide')
    const nameSlide = document.querySelectorAll('.name-slide')
    const langSlide = document.querySelectorAll('.lang-slide')
    const statusSlide = document.querySelectorAll('.status-slide')

    const listFilm = data.items
    for(let i = 0; i < 3; i++){
        const slug = listFilm[i].slug
        const movieData = await getData(`https://ophim1.com/phim/${slug}`)
        const movie = movieData.movie
        // console.log(movie)
        let img = movie.poster_url
        if(!movie.poster_url){
            img = movie.thumb_url
        }
        imgSlide[i].setAttribute('src',img)
        qualitySlide[i].textContent = movie.quality
        yearSlide[i].textContent = movie.year
        nameSlide[i].textContent = movie.name
        langSlide[i].textContent = movie.lang
        statusSlide[i].textContent = movie.status
        slide[i].classList.add(`${movie.slug}`)
        slide[i].addEventListener('click',()=>{
            // remove bc when a slider starting to slide the CDNjs will auto add 1 more class
            slide[i].classList.remove('swiper-slide-active')
            localStorage.setItem("slug", slide[i].className.split(' ')[1])
            window.location.href = 'movie.html'
        })
        // cannot use insert to render due to performance of slider
        // let slide = `
        // <div class="swiper-slide">
        //     <a href='movie.html'>
        //         <div class="main-slider-box">
        //             <div class="main-slider-overplay">
        //                 <ion-icon name="play" class="play-movie-icon"></ion-icon>
        //             </div>
        //             <div class="main-slider-img">
        //                 <img src="${img}" alt="Poster">
        //             </div>
        //             <div class="main-slider-text">
        //                 <span class="quality">${movie.quality}</span>
        //                 <div class="bottom-text">
        //                     <div class="movie-name">
        //                         <span>${movie.year}</span>
        //                         <strong>${movie.name}</strong>
        //                     </div>
        //                     <div class="lang-status">
        //                         <span>${movie.lang}</span>
        //                         <span>${movie.status}</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </a>
        // </div>
        // `

        // swiperWrapper.insertAdjacentHTML('beforeend',slide)
    }
}