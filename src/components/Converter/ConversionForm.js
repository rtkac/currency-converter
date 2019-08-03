import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// custom components
import Select from '../Select';
import CustomInput from '../Input/CustomInput';
import CustomButton from '../Button/CustomButton';
import CustomAlert from '../Alert/CustomAlert';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'

// constants
import { defaultCurrency } from '../../constants/others';

// helpers
import { validation } from '../../helpers/validation';

// redux
import { connect } from 'react-redux';
import { addConversion } from '../../actions/conversionActions';
import { notifyUser } from '../../actions/notifyActions';

const mapDispatchToProps = (dispatch) => {
  return {
    addConversion: conversions => dispatch(addConversion(conversions)),
    notifyUser: notify => dispatch(notifyUser(notify))
  };
}

class ConversionsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: {
        amount: {
          config: {
            value: '',
            name: 'amount',
            placeholder: 'Input value'
          },
          validation: {
            required: true,
            number: true,
            valid: false
          }
        },
        currency: {
          config: {
            value: '',
            name: 'currency',
            options: [
              {
                key: 'eur',
                value: 'EUR'
              },
              {
                key: 'usd',
                value: 'USD'
              },
              {
                key: 'czk',
                value: 'CZK'
              }
            ]
          },
          validation: {
            required: true,
            valid: false
          }
        }
      },
      convertedCurrency: '',
      formdataValid: false,
      loadingConversion: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const newFormdata = this.state.formdata;
    const newElement = newFormdata[event.target.name];

    newElement.config.value = event.target.value;
    
    let validationData = validation(newElement);
    newElement.validation.valid = validationData[0];
    newElement.validation.validationMessage = validationData[1];

    newFormdata[event.target.name] = newElement;

    let validationArr = [];
    for (const key of Object.keys(newFormdata)) {
      validationArr.push(newFormdata[key].validation.valid);
    }

    if(validationArr.every((value) => value)) {
      this.setState({
        formdataValid: true
      }, () => {
        this.getConversion();
      });

    } else {
      this.setState({
        formdataValid: false
      });

      const messageType = 'danger';
      const message = validationData[1];

      this.props.notifyUser({ messageType, message });
    }

    this.setState({
      formdata: newFormdata
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const value = parseFloat(this.state.formdata.amount.config.value).toFixed(2);
    const valueCurrency = defaultCurrency;
    const convertedValue = this.state.convertedCurrency;
    const convertedValueCurrency = this.state.formdata.currency.config.value.toUpperCase();

    this.props.addConversion({ value, valueCurrency, convertedValue, convertedValueCurrency });

    const messageType = 'success';
    const message = 'Conversion added successfully';

    this.props.notifyUser({ messageType, message });
  }

  getConversion() {
    this.setState({
      loadingConversion: true
    });
    axios.get('https://api.exchangeratesapi.io/latest', {
      params: {
        base: this.state.formdata.currency.config.value.toUpperCase()
      }
    })
    .then(res => {
      let amount = res.data.rates[defaultCurrency];

      this.setState({
        convertedCurrency: (this.state.formdata.amount.config.value * amount).toFixed(2),
        loadingConversion: false
      });

    })
    .catch(e => {
      this.setState({
        formdataValid: false,
        loadingConversion: false
      });

      const messageType = 'warning';
      const message = 'Could not connect to conversion API service';

      this.props.notifyUser({ messageType, message });
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {this.state.loadingConversion && (
          <Spinner animation="grow" />
        )}
        {this.state.formdataValid && (
          <CustomAlert
            variant="warning"
            class="alert__absolute"
            title={!this.state.loadingConversion ? `conversion: ${this.state.convertedCurrency} ${defaultCurrency}` : ''}
          />
        )}
        <CustomInput
          formdata={this.state.formdata.amount.config}
          onChange={this.onChange}
        />
        <Select
          formdata={this.state.formdata.currency.config}
          onChange={this.onChange}
        />
        <CustomButton
          type="submit"
          value={`Save conversion to ${defaultCurrency}`}
          variant="success"
          onChange={this.onChange}
          class="w-100"
          disabled={!this.state.loadingConversion && this.state.formdataValid ? false : true}
        />
      </Form>
    )
  }
}

ConversionsForm.propTypes = {
  addConversion: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired,
  defaultCurrency: PropTypes.string,
  defaultCurrencySymbol: PropTypes.string
}

export default connect(null, mapDispatchToProps)(ConversionsForm);