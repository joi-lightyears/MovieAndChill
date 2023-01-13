
// movie screen (close)
const movieModal = document.querySelector('#play')
const iframe = movieModal.querySelector('.movie-screen')
movieModal.addEventListener('click', handleClose)
function handleClose(){
    movieModal.classList.toggle('open')
    iframe.setAttribute('src', '')
}


// watchbtn
const watchBtn = document.querySelector('.watch-btn')
watchBtn.addEventListener('click', handleWatch)
function handleWatch(){
    movieModal.classList.toggle('open')
    iframe.setAttribute('src', 'https://1080.hdphimonline.com/share/f80bf05527157a8c2a7bb63b22f49aaa')
}

const postBoxes = document.querySelectorAll('.post-box')
postBoxes.forEach((movie)=>{
    movie.addEventListener('click',()=>{
        const slugData = movie.className.split(' ')[1]
        console.log(slugData)
    })
})