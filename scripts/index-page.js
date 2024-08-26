const comments = [
    { name: "Victor Pinto", date: new Date("11/02/2023"), text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
    { name: "Christina Cabrera", date: new Date("10/28/2023"), text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day." },
    { name: "Isaac Tadesse", date: new Date("10/20/2023"), text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." }
];

const formatTimeAgo = (date) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} minutes ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} hours ago`;
    } else if (secondsAgo < 604800) { 
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo} days ago`;
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
}


const createComment = (comment) => {
    
    const comments__name = document.createElement('h3');
    comments__name.className = 'comments__name';
    comments__name.textContent = comment.name;

    const comments__date = document.createElement('p');
    comments__date.className = 'comments__date';
    comments__date.textContent = formatTimeAgo(comment.date);
    

    const comments__text = document.createElement('p');
    comments__text.className = 'comments__text';
    comments__text.textContent = comment.text;
  

    const comments__head = document.createElement('div');
    comments__head.className = 'comments__head';
    comments__head.appendChild(comments__name);
    comments__head.appendChild(comments__date);

    
    const comments__information = document.createElement('div');
    comments__information.className = 'comments__information';
    comments__information.appendChild(comments__head);
    comments__information.appendChild(comments__text);


    const comments__photo = document.createElement('div');
    comments__photo.className = 'comments__photo';
    

    const comments__comment = document.createElement('div');
    comments__comment.className = 'comments__comment';
    comments__comment.appendChild(comments__photo);
    comments__comment.appendChild(comments__information);


    const comments__container = document.querySelector('.comments__container');
    comments__container.appendChild(comments__comment);
};

const displayComments = () => {

    const comments__container = document.querySelector('.comments__container');
    comments__container.innerHTML = ''
    comments.forEach(createComment);
};

displayComments();



// const form = document.querySelector('form');
// form.addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     const name = document.getElementById('name').value;
//     const text = document.getElementById('comment').value;

//     const date = new Date();

    

//     const newComment = { name: name, date: date , text: text };

//     comments.unshift(newComment);

//     displayComments();

//     form.reset();
// });

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    let hasError = false;

    // Check for empty fields and display error state
    if (!name) {
        nameInput.classList.add('error');
        hasError = true;
    } else {
        nameInput.classList.remove('error');
    }

    if (!text) {
        commentInput.classList.add('error');
        hasError = true;
    } else {
        commentInput.classList.remove('error');
    }

    // If there's an error, stop the form from submitting
    if (hasError) {
        return;
    }

    // If no errors, create the new comment and reset the form
    const date = new Date();

    // const day = String(date.getDate()).padStart(2, '0');
    // const month = String(date.getMonth() + 1).padStart(2, '0'); 
    // const year = date.getFullYear();

    // const formattedDate = `${month}/${day}/${year}`;

    const newComment = { name: name, date: date, text: text };

    comments.unshift(newComment);

    displayComments();

    form.reset();
});