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