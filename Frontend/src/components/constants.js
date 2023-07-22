import citiesData from '../assets/Data/CountryData.json';
// ========================================= API ===============================================
export const POST_FORM_API_URL = '/citizens';
// ======================================= CONSTANTS ===========================================
export const CITIES_COUNTRIES = citiesData,
    INIT_FORM_DATA = {
        country: null,
        city: null,
        covidInfected: false,
        healthConditions: [],
        otherConditions: ''
    },
    HEALTH_CONDITIONS = [
        {
            name: 'diabetes',
            label: 'Diabetes',
        },
        {
            name: 'cardio vascular problems',
            label: 'Cardio-Vascular problems',
        },
        {
            name: 'allergies',
            label: 'Allergies',
        },
    ],
    CONTACT_FIELDS = [{
        name: 'landline',
        label: 'Landline (optional):',
        placeholder: "050-1234-567",
        icon: 'fa-tty',
        minLength: 0,
        maxLength: 9,
        required: false,
    }, {
        name: 'cellular',
        label: 'Cellular:',
        placeholder: "050-123-4567",
        icon: 'fa-mobile',
        minLength: 10,
        maxLength: 10,
        required: true,
    }],
    NAMES = [{name: 'firstName', label: 'First Name'}, {name: 'lastName', label: 'Last Name'}],
    FORM_SUBMITTED_SUCCESSFULLY = 'Form submitted successfully!',
    HEADERS = {'Content-Type': 'application/json'},
    MSG_TYPE = {SUCCESS: 'success', ERROR: 'danger'};
