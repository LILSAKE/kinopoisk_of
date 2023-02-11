whyGrade = (number) => {
    grade = number
    const gradeDiv = document.querySelector(".grade")
    gradeDiv.innerHTML = ``
    for (let i = 1; i <= 5; i++) {
        if (i > number) {
            gradeDiv.innerHTML += `<span  onclick="whyGrade(${i})" class="material-symbols-outlined star">star</span>`
        } else {
            gradeDiv.innerHTML += `<span  onclick="whyGrade(${i})" class="material-symbols-outlined star active">star</span>`
        }
    }
    
}
addComment = () => {
    const textComment = document.querySelector(".textComment")
    const textUserName = document.querySelector(".textUserName")

    let commentData = {
        userId: 6,
        userName: textUserName.value,
        date: String(Date ()).split("(")[0].slice(0,-10),
        comment: textComment.value,
        grade: {
            number: grade,
            textStar: "",
        },
    }
    console.log(textUserName.value);

    for (let i = 1; i <= 5; i++) {
        if (i > grade) {
            commentData.grade.textStar += `<span class="material-symbols-outlined star">star</span>`
        } else {
            commentData.grade.textStar += `<span class="material-symbols-outlined star active">star</span>`
        }
    }

    comments.push(commentData)

    whyGrade(0)

    replaceTest(commentData)

    
}

async function drawComment() {
    
    try {
        const response = await axios.get(`${url}/comments/show/${idFilmWindow}`, {
        })

        console.log(response.data.message);

        const Cmnts = response.data.message

        const commentDiv = document.getElementById("comments")
        commentDiv.innerHTML = ``
        for(let i = 0; i < Cmnts.length; i++){

            let gradeVisial = ``

            if (Cmnts[i].filmRating <= 1) {
                gradeVisial = `
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                `
            }
            if (Cmnts[i].filmRating == 2) {
                gradeVisial = `
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                `
            }
            if (Cmnts[i].filmRating == 3) {
                gradeVisial = `
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                `
            }
            if (Cmnts[i].filmRating == 4) {
                gradeVisial = `
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star">star</span>
                `
            }
            if (Cmnts[i].filmRating >= 5) {
                gradeVisial = `
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                <span class="material-symbols-outlined star active">star</span>
                `
            }

            commentDiv.innerHTML += `
            <div class="comment">
                <div>
                    <span class="material-symbols-outlined iconUser">account_circle</span>
                    <div class="comUse">user</div>
                </div>
                <div class="userName">${Cmnts[i].fio}:</div>
                <div class="com">${Cmnts[i].commentText}</div>
                <div class="grede1">${gradeVisial}</div>
                <div class="date">${Cmnts[i].createDate.split("T")[0]}</div>
            </div>
            `
            gradeVisial = ``
        }
    } 
    catch (error) {
        console.log(error);
        console.log("нет коментариев");
        commentDiv.innerHTML = `((((((((((()))))))))))`
    }
}   

async function replaceTest(commentData) {
    try {
        const response = await axios.post(`${url}/comments/add`, {
            filmId: idFilmWindow,
            commentText: commentData.comment,
            filmRating: commentData.grade.number, // оценка
            userId: userId, 
        })
        console.log(response);
    } 
    catch (error) {
        console.log(error);
    }
    drawComment()
}

info2 = () => {
    const infoFilm = document.querySelector(".infoFilm")
    const infoImg = document.querySelector(".infoImg")

    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${idFilmWindow}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '17c3449d-b9b4-492b-8174-dac6d4d1c4c6',
        },
    })
    .then(res => res.json())
    .then(post => {

        console.log(post);

        if (post.nameRu == null) {
            post.nameRu = post.nameOriginal
        }
        if (post.ratingAgeLimits == null) {
            post.ratingAgeLimits = 'age18'
        }
        if (post.description == null) {
            post.description = 'нет данных'
        }

        let countri = ''
        for (let i = 0; i < post.countries.length; i++) {
            countri += post.countries[i].country + ', '
        } 

        infoImg.innerHTML = `<img src="${post.posterUrl}" alt="пока что нет" class="imgClass">`
        infoFilm.innerHTML = `
        <div id="nameFilm"><span>Название: </span>${post.nameRu}</div>
        <div><span>Рейтинг: </span>${post.ratingKinopoisk}</div>
        <div><span>Возрастное ограничение: </span>${post.ratingAgeLimits.slice(3)}+</div>
        <div><span>Страны: </span>${countri.slice(0, -2)}</div>
        <div><span>Год: </span>${post.year}</div>
        <div><span>Описание: </span>${post.description}</div>
        `
    })
    .catch(err => console.log(err))
}

const url = `http://192.168.1.215:5000`;

const idFilmWindow = window.location.href.split("id=")[1]

const userId = 4

let grade = 0
let comments = []

info2()

drawComment()
