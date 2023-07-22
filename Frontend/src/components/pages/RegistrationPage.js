import React, {useState} from 'react';
import {Form, Button, Row, Col, Container, ButtonGroup, Alert} from 'react-bootstrap';
import Select from 'react-select';
import {
    NAMES,
    HEADERS,
    MSG_TYPE,
    INIT_FORM_DATA,
    CONTACT_FIELDS,
    CITIES_COUNTRIES,
    POST_FORM_API_URL,
    HEALTH_CONDITIONS,
    FORM_SUBMITTED_SUCCESSFULLY
} from '../constants'
import {status} from '../funcs'

const RegistrationPage = () => {
    const [isOtherCondition, setIsOtherCondition] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [formData, setFormData] = useState(INIT_FORM_DATA);
    const [msg, setMsg] = useState(null);
    const resetForm = () => {
        setFormData(INIT_FORM_DATA);
        setSelectedCountry(null);
        setIsOtherCondition(false);
    };
    const updateFormData = (updates) => {
        setFormData((prevData) => ({
            ...prevData, ...updates,
        }));
    };
    const handleCityChange = (selectedCity) => {
        setFormData((prevData) => ({
            ...prevData, city: selectedCity.value, cellular: '',
        }));
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        updateFormData({
            [name]: checked,
        });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        updateFormData({
            [name]: value,
        });
    };

    const handleCountryChange = (selectedCountry) => {
        const {value} = selectedCountry;
        updateFormData({
            country: value,
        });
        setSelectedCountry(value);
    };
    const handleConditionsChange = (event) => {
        const {name, checked} = event.target;
        if (checked) {
            // Add the condition to the healthConditions array
            updateFormData({
                healthConditions: [...formData.healthConditions, name],
            });
        } else {
            // Remove the condition from the healthConditions array
            updateFormData({
                healthConditions: formData.healthConditions.filter((condition) => condition !== name),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(POST_FORM_API_URL, {
            method: 'POST', headers: HEADERS, body: JSON.stringify(formData),
        }).then(status)
            .then((data) => {
                setMsg({type: MSG_TYPE.SUCCESS, msg: FORM_SUBMITTED_SUCCESSFULLY});
                resetForm();
            })
            .catch((error) => {
                setMsg({type: MSG_TYPE.ERROR, msg: error.message});
            })
    };


    return (<Container className="mt-5">
        <Row>
            <Col md={8} className="mx-auto bg-light p-4 shadow-lg">
                <h2 className="text-center">
                    Registration Form <i className="fas fa-user-plus ms-2"/>
                </h2>
                <h6 className="text-center">
                    Please <i className={'fa fa-sm fa-pencil'}/> fill in the form below
                </h6>
                <hr/>
                <Row>
                    {msg && <Alert variant={msg.type}>{msg.msg}</Alert>}
                    <Col className="justify-content-center align-items-center mx-auto" md="10">
                        <Form onSubmit={handleSubmit}>
                            {NAMES.map((field) => (
                                <Form.Group as={Row} controlId={field.name} className="mt-3" key={field.name}>
                                    <Form.Label column sm={2}>
                                        {field.label}:
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>))}
                            <Form.Group as={Row} controlId="country" className="mt-3">
                                <Form.Label column sm={2}>
                                    Country:
                                </Form.Label>
                                <Col sm={10}>
                                    <Select
                                        options={CITIES_COUNTRIES.map((option) => ({
                                            value: option.country, label: option.country, key: option.country
                                        }))}
                                        value={formData.country ? {
                                            value: formData.country, label: formData.country, key: formData.country
                                        } : "please choose country"}
                                        onChange={handleCountryChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="city" className="mt-3">
                                <Form.Label column sm={2}>
                                    City:
                                </Form.Label>
                                <Col sm={10}>
                                    <Select
                                        options={
                                            selectedCountry
                                                ? CITIES_COUNTRIES.find(item => item.country === selectedCountry)?.city.map((city) => ({
                                                    value: city, label: city, key: city
                                                })) : []
                                        }
                                        onChange={handleCityChange}
                                        required
                                        name={'city'}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="zipCode" className="mt-3">
                                <Form.Label column sm={2}>
                                    Zip code (optional):
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode || ''}
                                        onChange={handleInputChange}
                                        placeholder={"12345"}
                                        minLength={5}
                                        maxLength={5}
                                        key={"zipCode"}
                                        required={false}
                                    />
                                </Col>
                            </Form.Group>
                            {CONTACT_FIELDS.map((field) => (
                                <Form.Group as={Row} controlId={field.name} className="mt-3" key={field.name}>
                                    <Form.Label column sm={6}>
                                        <i className={`fa ${field.icon}`}/> {field.label}
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            type="text"
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleInputChange}
                                            minLength={field.minLength}
                                            maxLength={field.maxLength}
                                            placeholder={field.placeholder}
                                            key={field.name}
                                            required={field.required}
                                        />
                                    </Col>
                                </Form.Group>))}
                            {[{name: 'address', label: 'Address', type: 'text', required: true}, {
                                name: 'dateOfBirth',
                                label: 'Date of Birth',
                                type: 'date',
                                required: true
                            }].map(field => (
                                <Form.Group as={Row} controlId={field.name} className="mt-3" key={field.name}>
                                    <Form.Label column sm={2}>
                                        {field.label}:
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleInputChange}
                                            required={field.required}
                                        />
                                    </Col>
                                </Form.Group>))}
                            <Form.Group as={Row} controlId="covidInfected" className="mt-3">
                                <Form.Label column sm={8}>
                                    Have you been infected by COVID-19 before?
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Check
                                        type="checkbox"
                                        name="covidInfected"
                                        checked={formData.covidInfected}
                                        onChange={handleCheckboxChange}
                                        key={'covidInfected'}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="conditions" className="mt-3">
                                <Form.Label column sm={3}>
                                    Previous conditions:
                                </Form.Label>
                                <Col sm={9}>
                                    {HEALTH_CONDITIONS.map(option => <Form.Check
                                        type="checkbox"
                                        name={option.name}
                                        label={option.label}
                                        checked={formData[option.name]}
                                        onChange={handleConditionsChange}
                                        key={option.name}
                                    />)}
                                    <Form.Check
                                        type="checkbox"
                                        label={'Other'}
                                        checked={isOtherCondition}
                                        onChange={() => {
                                            setIsOtherCondition(!isOtherCondition)
                                            formData.otherConditions = ""
                                        }}
                                        key={'other'}
                                    />
                                    {isOtherCondition && (<Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="otherConditions"
                                        value={formData.otherConditions}
                                        onChange={handleInputChange}
                                        minLength={3} maxLength={100}
                                        placeholder={'Please specify your other conditions'}
                                        required
                                        key={'other-conditions'}
                                    />)}
                                </Col>
                            </Form.Group>
                            <ButtonGroup className="mt-5  d-flex justify-content-center">
                                <Button type="submit" variant={'contained'}
                                        className={'border-dark mx-2'}>Submit</Button>
                                <Button variant={'contained'} onClick={resetForm}
                                        className={'border-dark mx-2'}><i
                                    className="fa fa-rotate-right"></i></Button>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>);
};
export default RegistrationPage;