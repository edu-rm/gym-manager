const cards = document.querySelectorAll(".card")
console.log(cards)

for(let card of cards){
    card.addEventListener("click",function(){
        const titulo = card.querySelector('.card__content p').textContent

        console.log(titulo)
        window.location.href = `/pesquisa?repo=${titulo}`
    })
}