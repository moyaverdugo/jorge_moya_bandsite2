
// defining useful functions that dont use the api -------------------------------------------------

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

const createComment = (comment,api) => {
    
    const comments__name = document.createElement('h3');
    comments__name.className = 'comments__name';
    comments__name.textContent = comment.name;

    const comments__date = document.createElement('p');
    comments__date.className = 'comments__date';
    comments__date.textContent = formatTimeAgo(comment.date);
    
    const comments__text = document.createElement('p');
    comments__text.className = 'comments__text';
    comments__text.textContent = comment.text;
    
    const likeButton = document.createElement('button');
    likeButton.className = 'comments__like-button';
    likeButton.textContent = 'Like';
    likeButton.id = `like-button-${comment.id}`;
    
    //crating one event listener per like button in each comment
    likeButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await api.likeComment(comment.id);
        displayComments(api);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'comments__delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.id = `delete-button-${comment.id}`;
    
    // same here, one event listener per delete button
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await api.deleteComment(comment.id);
        displayComments(api);
    });

    const comments__actions = document.createElement('div');
    comments__actions.className = 'comments__actions';
    comments__actions.appendChild(likeButton);
    comments__actions.appendChild(deleteButton);

    const comments__head = document.createElement('div');
    comments__head.className = 'comments__head';
    comments__head.appendChild(comments__name);
    comments__head.appendChild(comments__date);

    const comments__information = document.createElement('div');
    comments__information.className = 'comments__information';
    comments__information.appendChild(comments__head);
    comments__information.appendChild(comments__text);
    comments__information.appendChild(comments__actions);


    const comments__photo = document.createElement('div');
    comments__photo.className = 'comments__photo';
    

    const comments__comment = document.createElement('div');
    comments__comment.className = 'comments__comment';
    comments__comment.appendChild(comments__photo);
    comments__comment.appendChild(comments__information);


    const comments__container = document.querySelector('.comments__container');
    comments__container.appendChild(comments__comment);
};

// defining functions that use the api -------------------------------------------------


import { BandSiteApi } from './band-site-api.js';

// getting api_key
const getApiKey = async () => {
    try {
      const response = await axios.get('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error registering API key:', error);
    }
  };

// display of all comments
const displayComments = async (api) => {
    try{
        const comments__container = document.querySelector('.comments__container');
        comments__container.innerHTML = ''
        const commentsData = await api.getComments();
        console.log(commentsData);
        commentsData.forEach((comment) => {
            createComment({
                name: comment.name,
                date: new Date(comment.timestamp), 
                text: comment.comment,
                likes: comment.likes,
                id: comment.id
            },api);
        });
    } catch (error) {
        console.error('Error creating comments',error);
    }
};

// initializing the api at the beginning and everytime we perform an action
const initializeApi = async () => {
    const apiKey = await getApiKey(); // getting the key
    const api = new BandSiteApi(apiKey); // creating an api class

    displayComments(api);

    const form = document.querySelector('form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');

        const name = nameInput.value.trim();
        const text = commentInput.value.trim();

        let hasError = false;

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

        if (hasError) {
            return;
        }

        try {
            await api.postComment({ name, comment: text });

            nameInput.value = '';
            commentInput.value = '';

            displayComments(api);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    });

};

// Initializing the API -------------------------------------------------

initializeApi();


