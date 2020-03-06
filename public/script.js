const currentPage = location.pathname
const menuItens = document.querySelectorAll('header .links a')


for (item of menuItens){
    if(currentPage.includes(item.getAttribute('href'))) {
        item.classList.add("active")
    }
}

/*===============PAGINAÇÃO==============*/

let total_pages = 20 , selected_page = 16, pages = [], oldPage

for(let cp = 1 ; cp<= total_pages;cp++){

    const firstAndLastPage = cp == 1 || cp == total_pages
    const pageAfterSelectedPage = cp<=selected_page + 2
    const pageBeforeSelectedPage = cp>= selected_page - 2

    if(firstAndLastPage || (pageAfterSelectedPage && pageBeforeSelectedPage)){
        if(oldPage && cp - oldPage >2){
            pages.push("...")
        }

        if(oldPage && cp - oldPage ==2){
            pages.push(cp-1)
        }
        pages.push(cp)

        oldPage = cp
    }
    
}

console.log(pages)

