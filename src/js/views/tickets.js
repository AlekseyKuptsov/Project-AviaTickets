import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.currencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';
    const symbol = this.currencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, symbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено. 
        </div>
        `;
  }

  static ticketTemplate(ticket, symbol) {
    return `
        <div class="col s12 m6">
            <div div class ="card ticket-card" data-ticket-id="${ticket.ticket_id}">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src="${ticket.airline_logo}"
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${ticket.airline_name}</span
                >
                <button class ="btn add-favorite waves-effect light-green accent-4 ml-auto"
                type = "submit"
                name = "action">Add to Favorite</button>
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${ticket.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${ticket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${symbol} ${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
              </div>
            </div>
        </div>
        `;
  }
}

class FavouriteUI {
  constructor(currency) {
    this.container = document.querySelector('#dropdown1');
    this.currencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderFavouriteTickets(tickets) {
    this.clearContainer();

    let fragment = '';
    const symbol = this.currencySymbol();

    tickets.forEach(ticket => {
      const template = FavouriteUI.ticketTemplate(ticket, symbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML('beforeend', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  static ticketTemplate(ticket, symbol) {
    return `
    <div class = "favorite-item d-flex align-items-start" data-ticket-id="${ticket.ticket_id}">
      <img src = "${ticket.airline_logo}" class="favorite-item-airline-img"/>
      <div class = "favorite-item-info d-flex flex-column">
        <div class = "favorite-item-destination d-flex align-items-center">
          <div class = "d-flex align-items-center mr-auto">
            <span class = "favorite-item-city">${ticket.origin_name}</span>
            <i class = "medium material-icons"> flight_takeoff </i>
          </div>
          <div class = "d-flex align-items-center" >
            <i class = "medium material-icons" > flight_land </i>
            <span class = "favorite-item-city" > ${ticket.destination_name} </span>
          </div>
        </div>
        <div class = "ticket-time-price d-flex align-items-center">
          <span class = "ticket-time-departure" > ${ticket.departure_at} </span>
          <span class = "ticket-price ml-auto" > ${symbol} ${ticket.price} </span>
        </div>
        <div class = "ticket-additional-info" >
          <span class = "ticket-transfers" > Пересадок: ${ticket.transfers} </span>
          <span class = "ticket-flight-number" > Номер рейса: ${ticket.flight_number} </span>
        </div>
        <a class = "waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"> Delete </a>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

const favouriteUI = new FavouriteUI(currencyUI);


export { ticketsUI, favouriteUI };