//синхронные операции
// console.log('привет');
// const div = document.querySelector('#posts');
// div.innerHTML= 'Посты';

//Асинхронные операции (время для js не известна)

async function getPosts(page = 1, filter = "") {//(/1)-параметр(пост под номером 1) | comm... комментарий 
    try {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}`, { //функция fetch для получение данных
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '49bfd1ec-fd12-47a8-b1a3-ed702e44c52e'
        },
        });
        const posts = await response.json(); // .json() преобразует в обычный массив
        
        // filter = filter

        console.log(posts);
        console.log(posts.items)

        showPosts(posts.items, filter);
    
        activePage = page
        totalPage = posts.totalPages
        
        drawPagination(activePage, totalPage)

    } catch (error) {
        console.log(error)
        console.log("не удалось получить фильмы");
    }
    finally{console.log("ok, успех");}

}
showPosts = (posts, filter = "0") => {
    films = []
    count = 0
    postsDiv.innerHTML = ``
    for (const post of posts) {
        if (post.nameRu == null) {
            nameI = post.nameOriginal
        } else {
            nameI = post.nameRu
        }
        let gens = ''
        for (let i = 0; i < post.genres.length; i++) {
            gens += post.genres[i].genre + ', '
        } 
        let film = {
            id: `${post.kinopoiskId}`,
            posterUrl: `${post.posterUrl}`,
            raiting: `${post.ratingKinopoisk}`, 
            name: nameI,
            gens: gens.slice(0, -2),
            year: `${post.year}`,
        }
        
        films.push(film)
    }

    if (filter == 1) {
        films.sort((a, b) => {return parseFloat(b.raiting) - parseFloat(a.raiting)});
        console.log('есть 1');
    }
    if (filter == 2) {
        films.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
        console.log('есть 2');
    }
    if (filter == 3) {
        films.sort((a, b) => {return parseFloat(b.year) - parseFloat(a.year)});
        console.log('есть 3');
    }
    
    for (let i = 0; i < films.length; i++) {
        postsDiv.innerHTML += `
        <div class="styleElementBody">
        <a onclick="info(${films[i].id}, ${count})">
        <div style="background-image: url(${films[i].posterUrl})" class="imgClass" >
        <i class="rating">${films[i].raiting}</i>
        </div>
        </a>
        <div class="downBlockCard">
        ${films[i].name}
        </div>
        <div class="afterDownBlockCard">
        ${films[i].gens}
        </div>
        </div>`
        count++
    }

    console.log(films);

    if (films.length == 0) {
        postsDiv.innerHTML = `<div class="notSearch">Ничего не найдено(</div>`
        console.log("Ничего не найдено(");
    } else {
        console.log("Найдено)");
    }

}
info = (id, count) => {
    console.log(count);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '49bfd1ec-fd12-47a8-b1a3-ed702e44c52e',
        },
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        
        countries = ''
        for (let i = 0; i < json.countries.length; i++) {
            countries += json.countries[i].country + ", "
        }

        thenFilm = [json.posterUrl, 
            json.nameRu,
            json.ratingKinopoisk,
            json.ratingAgeLimits,
            countries,
            json.year,
            json.description
        ]

        if (thenFilm[1] == null) {
            thenFilm[1] = json.nameOriginal
        }
        if (thenFilm[3] == null) {
            thenFilm[3] = 'age18'
        }
        if (thenFilm[6] == null) {
            thenFilm[6] = 'без описания'
        }

        postsDiv.innerHTML = ``
        for (let c = 0; c < films.length; c++) {
            if (c != count){
                postsDiv.innerHTML += `
                <div class="styleElementBody">
                <a onclick="info(${films[c].id}, ${c})">
                <div style="background-image: url(${films[c].posterUrl})" class="imgClass" >
                <i class="rating">${films[c].raiting}</i>
                </div>
                </a>
                <div class="downBlockCard">
                ${films[c].name}
                </div>
                <div class="afterDownBlockCard">
                ${films[c].gens}
                </div>
                </div>`
            } else {
                postsDiv.innerHTML += `<a onclick="returnBack(${id})">
                <div class="infoTheFilm">
                <img src="${thenFilm[0]}" class="imgClass1">
                <div id="dopBlock">
                <div><span>Название: </span>${thenFilm[1]}</div>
                <div><span>Рейтинг: </span>${thenFilm[2]}</div>
                <div id="T1"><span>Возрастные ограничения: </span>${thenFilm[3].slice(3, 5)}+</div>
                <div><span>Страны: </span>${thenFilm[4].slice(0, -2)}</div>
                <div><span>Год выпуска: </span>${thenFilm[5]}</div>
                <div><span>Описание: </span>${thenFilm[6]}</div>
                </div>
                </div></a>`
            }
        }
        console.log(thenFilm);
    })
    .catch(err => console.log(err))

    console.log(films);
}
returnBack = (id) => {
    postsDiv.innerHTML = ``
    for (let i = 0; i < films.length; i++) {
        postsDiv.innerHTML += `
        <div class="styleElementBody">
        <a onclick="info(${films[i].id}, ${i})">
        <div style="background-image: url(${films[i].posterUrl})" class="imgClass" >
        <i class="rating">${films[i].raiting}</i>
        </div>
        </a>
        <div class="downBlockCard">
        ${films[i].name}
        </div>
        <div class="afterDownBlockCard">
        ${films[i].gens}
        </div>
        </div>`
    }
    window.open(`filmData.html?id=${id}`)
}
drawPagination = (activePage, totalPage) => {
    paginationButtons.innerHTML = ``
    for (let i = 1; i <= totalPage; i++) {
        if (i == activePage) {
            paginationButtons.innerHTML += `<button style="background-color: green;" onclick="getPosts(${i})">
                ${i}</button>`
        } else {
            paginationButtons.innerHTML += `<button onclick="getPosts(${i})">
                ${i}</button>`
        }
    }
} 
raplace__down = () => {
    if (activePage > 1) {
        getPosts(activePage - 1)
    } else {
        console.log("ты дурак?");
    }
    
}
replace__up = () => {
    if (activePage < totalPage) {
        getPosts(activePage + 1)
    } else {
        console.log("ты дурак?");
    }
}
serchFilm = () => {
    infoFilms(serchInp.value)
}
async function infoFilms(searchNameFilm) {

    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&keyword=${searchNameFilm}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '49bfd1ec-fd12-47a8-b1a3-ed702e44c52e',
    },
    });

    const searchPosts = await response.json();

    console.log(searchPosts);
    
    console.log(searchPosts.items)

    showPosts(searchPosts.items)

}
goBack = () => {
    serchInp.value = ''
    getPosts(activePage);
}
getSortedFilm = () => {
    const howSort = document.querySelector(".howSort")
    howSort.innerHTML = `<p class="movieSelection">
    <input onclick="whiSort(1)" type="radio" name="Filter" value="rai" checked="checked">По рейтингу
    <input onclick="whiSort(2)" type="radio" name="Filter" value="alf">По Алфавиту
    <input onclick="whiSort(3)" type="radio" name="Filter" value="yea">По году выпуска
    <button onclick="sortFilms()"><span class="material-symbols-outlined">done</span></button>
    </p>`
}
whiSort = (num) => {sorted = num;}
sortFilms = () => {
    getPosts(activePage, sorted)
    console.log("work...");
}





//Виды запросов: Get(получение данных), Post(запись данных/сохранение на сервере), Delete, Put(изменение данных)

//Статус код запроса:
//200 - успешно
//400 - ошибка

//параметры запросов
// PATH-параметр (параметр пути): https://jsonplaceholder.typicode.com/posts
// QUERY-параметр : https://jsonp

// рейтинг, алфавит, год выпуска

let films = []
const postsDiv = document.getElementById('posts');

let activePage = 1
let totalPage = 0

let sorted = 0

const paginationButtons = document.getElementById('paginationButtons')

const serchInp = document.querySelector('.serchInp');

getPosts(activePage);
