const getList = async () => {
    const response = await fetch('http://localhost:1337/api/logs', {
        method: 'GET',
        credentials: 'same-origin',
    })

    const data = await response.json();

    const template = data.map(
        (element) => {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = `
            <div class="item">
                <h3 class="item-title"><a href="./details.html">${element.title}</a></h3>
                <p class="item-rating">${element.rating}/10</p>
            </div>`

            return wrapper;
        }
    );

    const container = document.querySelector('.container-list');
    template.forEach(
        (element) => {
            container.appendChild(element);
        }
    );
}

const getDetails = async (id) => {
    const response = await fetch('http://localhost:1337/api/logs/' + id, {
        method: 'GET',
        credentials: 'same-origin',
    })

    const data = await response.json();

    const template = data.map(
        (element) => {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div class="item">
                    <h3 class="item-title">${element.title}</h3>
                    <p class="item-rating">Rating: ${element.rating}/10</p>
                    <p class="item-desc">${element.description}</p>
                    <p class="item-comments">${element.comments}</p>
                    <p class="item-date">Visited ${element.visitDate}</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=${element.latitude},${element.longitude}">Spot on map</a>
                </div>`

            return wrapper;
        }
    );

    const container = document.querySelector('.container-details');
    template.forEach(
        (element) => {
            container.appendChild(element);
        }
    );
}

const addEntry = async () => {
    const form = document.getElementById('log-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

const list = document.querySelector('.container-list');
const details = document.querySelector('.container-details');

list && getList();
details && getDetails();
