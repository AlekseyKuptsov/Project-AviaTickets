import {
    getAutocompleteInstance,
    getDatePickerInstance
} from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.querySelector('#autocomplete-origin');
        this.destination = document.querySelector('#autocomplete-destination');
        this.depart = document.querySelector('#datepicker-depart');
        this.return = document.querySelector('#datepicker-return');
        this.originAutocomplete = autocompleteInstance(this.origin); // получение значения формы
        this.destinationAutocomplete = autocompleteInstance(this.destination); // получение значения формы
        this.departDatePicker = datePickerInstance(this.depart); // получение значения формы
        this.returnDatePicker = datePickerInstance(this.return); // получение значения формы
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatePicker.toString(); // из materialize для получения даты в формате строки
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data); // из materialize Update autocomplete options data
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;