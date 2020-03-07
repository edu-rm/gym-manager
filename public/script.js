const currentPage = location.pathname
const menuItens = document.querySelectorAll('header .links a')


for (item of menuItens){
    if(currentPage.includes(item.getAttribute('href'))) {
        item.classList.add("active")
    }
}

/*===============PAGINAÇÃO==============*/


function paginate(selected_page, total_pages){
    
let pages = [], oldPage

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
    
    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

let elements  = ""

for(let page of pages){
    if(String(page).includes("...")){
        elements += `<span>${page}</span>`
    }else{
        elements += `<a href="?page=${page}">${page}</a>`

    }
}
pagination.innerHTML = elements



