const shows = [
    { date: "Mon Sept 09 2024", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "Tue Sept 17 2024", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "Sat Oct 12 2024", venue: "View Lounge", location: "San Francisco, CA" },
    { date: "Sat Nov 16 2024", venue: "Hyatt agency", location: "San Francisco, CA" },
    { date: "Fri Nov 29 2024", venue: "Moscow Center", location: "San Francisco, CA" },
    
];


const createTableHeader = () => {
    const headerRow = document.createElement('div');
    headerRow.classList.add('shows__headers');

    const dateLabel = document.createElement('p');
    dateLabel.classList.add('shows__header');
    dateLabel.textContent = 'DATE';
    headerRow.appendChild(dateLabel);

    const venueLabel = document.createElement('p');
    venueLabel.classList.add('shows__header');
    venueLabel.textContent = 'VENUE';
    headerRow.appendChild(venueLabel);

    const locationLabel = document.createElement('p');
    locationLabel.classList.add('shows__header');
    locationLabel.textContent = 'LOCATION';
    headerRow.appendChild(locationLabel);

    shows__list.appendChild(headerRow);
};


const createShow = (show) => {
    const shows__show = document.createElement('div');
    shows__show.classList.add('shows__show');

    const date_label = document.createElement('p');
    date_label.classList.add('shows__label');
    date_label.textContent = 'DATE';
    shows__show.appendChild(date_label);

    const date_info = document.createElement('h3');
    date_info.classList.add('shows__info');
    date_info.textContent = show.date;
    shows__show.appendChild(date_info);

    const venue_label = document.createElement('p');
    venue_label.classList.add('shows__label');
    venue_label.textContent = 'VENUE';
    shows__show.appendChild(venue_label);

    const venue_info = document.createElement('h4');
    venue_info.classList.add('shows__info');
    venue_info.textContent = show.venue;
    shows__show.appendChild(venue_info);

    const location_label = document.createElement('p');
    location_label.classList.add('shows__label');
    location_label.textContent = 'LOCATION';
    shows__show.appendChild(location_label);

    const location_info = document.createElement('h4');
    location_info.classList.add('shows__info');
    location_info.textContent = show.location;
    shows__show.appendChild(location_info);

    const button = document.createElement('button');
    button.classList.add('shows__button');
    button.addEventListener('click', () => {
        // Remove 'selected' class from all rows
        document.querySelectorAll('.shows__show').forEach(row => {
            row.classList.remove('selected');
        });
        // Add 'selected' class to the clicked row
        shows__show.classList.add('selected');
    });

    const button__text = document.createElement('h4');
    button__text.classList.add('button__text');
    button__text.textContent = 'BUY TICKETS';
    button.appendChild(button__text);

    shows__show.appendChild(button);


    shows__list.appendChild(shows__show);
};


const shows__list = document.querySelector('.shows__list');
createTableHeader();
shows.forEach(createShow);

