import { favouriteUI } from "../views/tickets";

class FavouriteTickets {
    constructor() {
        this.favourite = [];
    }

    getFavourite() {
        if (localStorage.getItem('favourite_tickets')) {
            this.favourite = JSON.parse(localStorage.getItem('favourite_tickets'));
            favouriteUI.renderFavouriteTickets(this.favourite);
        } else return;
    }

    setFavourite(fav) {
        if (this.favourite.length) {
            this.favourite = this.favourite.filter(item => item.ticket_id !== fav[0].ticket_id);
        }
        this.favourite.push(...fav);
        localStorage.setItem('favourite_tickets', JSON.stringify(this.favourite));
        console.log(this.favourite);
        favouriteUI.renderFavouriteTickets(this.favourite);
    }

    deleteFavourite(elem) {
        console.log(this.favourite);
        this.favourite = this.favourite.filter(item => item.ticket_id != elem.closest('.favorite-item').dataset.ticketId);
        localStorage.setItem('favourite_tickets', JSON.stringify(this.favourite));
        favouriteUI.renderFavouriteTickets(this.favourite);
    }

}

const favouriteTickets = new FavouriteTickets();

export default favouriteTickets;