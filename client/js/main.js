const getList = async () => {
    const response = await fetch('http://localhost:1337/api/logs', {
        method: 'GET',
        credentials: 'same-origin',
    })

    const data = await response.json();

    const template = data.map(
        (element) => {
            var wrapper = document.createElement('div');
            wrapper.classList.add('d-flex', 'justify-content-center', 'p-2');
            wrapper.innerHTML = `
            <button class="item btn btn-outline-info" data-id="${element._id}" data-bs-toggle="modal" data-bs-target="#itemModal">
                <h3 class="item-title">${element.title}</h3>
                <p class="item-rating">${element.rating}/10</p>
            </button>`

            return wrapper;
        }
    );

    const container = document.querySelector('.container-list');
    template.forEach(
        (element) => {
            container.appendChild(element);
        }
    );

    const items = document.querySelectorAll('.item');
    items.forEach((element) => {
        element.addEventListener('click', async (event) => {
            const body = await getDetails(element.dataset.id);
            const modal = document.querySelector('.modal-body');
            modal.innerHTML = body.innerHTML;

            const deleteListener = document.querySelector('#delete-entry');
            deleteListener.addEventListener('click', async (event) => {
                deleteEntry(element.dataset.id);
            });
        });
    });

}

const getDetails = async (id) => {
    const response = await fetch(`http://localhost:1337/api/logs/${id}` , {
        method: 'GET',
        credentials: 'same-origin',
    })

    const data = await response.json();

    const bodyWrapper = document.createElement('div');
    bodyWrapper.innerHTML = `
                <div class="bodyModal">
                    <h3 class="modal-title">${data.title}</h3>
                    <p class="modal-rating">Rating: ${data.rating}/10</p>
                    <p class="modal-desc">Description: ${data.description}</p>
                    <p class="modal-comments">Comments: ${data.comments}</p>
                    <p class="modal-date">Visited ${data.visitDate}</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}">Spot on map</a>
                </div>`

    return bodyWrapper;
}

const addEntry = async () => {
    const form = document.getElementById('log-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const json = {};
        formData.forEach((value, key) => {
            json[key] = value;

        });

        const request = fetch('http://localhost:1337/api/logs/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        })
    });
}

const deleteEntry = async (id) => {
    const request = await fetch(`http://localhost:1337/api/logs/delete/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
    })

    location.reload();
}

const list = document.querySelector('.container-list');
const submition = document.querySelector('.post-log');

list && getList();
submition && addEntry();

