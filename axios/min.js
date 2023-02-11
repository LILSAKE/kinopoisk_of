console.log("hi");

const url = `http://192.168.1.73:5000`;

// async function createUser() {
//     try {
//         const response = await axios.post(`${url}/user/add`, { // можно и get
//             fio: "Биба",
//             tableId: 4,
//         });
//         console.log(response);

//     } 
//     catch (error) {
//         console.error("ошибка", error);
//     }
// }

async function createComment () {
    try {
        const response = await axios.post(`${url}/comments/add`, {
            filmId: 1,
            commentText: "бла-бла бла-бла-бла-бла бла-бла бла-бла бла-бла-бла-бла",
            filmRating: 5, 
            userId: 4,
        })    
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
}
createComment();