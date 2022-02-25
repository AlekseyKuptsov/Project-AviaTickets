import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import { ticketsUI, favouriteUI } from './views/tickets';
import favouriteTickets from './store/favourite';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    favouriteTickets.getFavourite();

    const form = formUI.form;
    const favBtn = document.querySelector('.dropdown-content');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    ticketsUI.container.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-favorite')) {
            console.log(e.target.closest('.ticket-card').dataset.ticketId);
            const fav = locations.lastSearch.filter(ticket => ticket.ticket_id == e.target.closest('.ticket-card').dataset.ticketId);

            console.log(fav);

            favouriteTickets.setFavourite(fav);
        }
    });

    favBtn.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-favorite')) {
            
            favouriteTickets.deleteFavourite(e.target);
        }
    });

    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiestList);
    }

    async function onFormSubmit() {
        //собираем данные из inputs
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        console.log(origin, destination, depart_date, return_date);
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        console.log(locations.lastSearch);
        ticketsUI.renderTickets(locations.lastSearch);


    }
});

// locations.init().then(res => {
//     console.log(res);
//     console.log(locations);
//     console.log(locations.getCitiesByCountryCode('PE'));
// });