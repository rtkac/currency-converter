import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import Select from '../Select';
import CustomInputGroup from '../Input/CustomInputGroup';
import CustomButton from '../Button/CustomButton';
import CustomAlert from '../Alert/CustomAlert';

// react-bootstrap
import Form from 'react-bootstrap/Form';

// constants
import { defaultCurrency, defaultCurrencySymbol } from '../../constants/others';

// helpers
import { validation } from '../../helpers/validation';

// redux
import { connect } from 'react-redux';
import { addConversion } from '../../actions/conversionActions';
import { notifyUser } from '../../actions/notifyActions';

function mapDispatchToProps(dispatch) {
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
            valid: false,
            validationMessage: ''
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
            valid: false,
            validationMessage: ''
          }
        }
      },
      convertedCurrency: '',
      formdataValid: false,
      formError: false,
      formSuccess: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // componentDidMount() {
  //   // reset alert
  //   this.props.notifyUser(null, null)
  // }

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

    const value = this.state.formdata.amount.config.value;
    const valueCurrency = defaultCurrency;
    const convertedValue = this.state.convertedCurrency;
    const convertedValueCurrency = this.state.formdata.currency.config.value.toUpperCase();

    this.props.addConversion({ value, valueCurrency, convertedValue, convertedValueCurrency });

    const messageType = 'success';
    const message = 'Conversion added successfully';

    this.props.notifyUser({ messageType, message });
    
    this.setState({formSuccess: true})
  }

  getConversion() {
    if(this.state.formdataValid) {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.formdata.currency.config.value.toUpperCase()}`)
        .then(res => res.json())
        .then(data => {
          let amount = data.rates[defaultCurrency];

          this.setState({
            convertedCurrency: (this.state.formdata.amount.config.value / amount).toFixed(2)
          });

        })
        .catch(e => {
          this.setState({
            formdataValid: false,
            formError: true
          })
        })
    } else {
      this.setState({
        convertedCurrency: ''
      })
    }
  }

  render() {

    // let alert;

    // if(this.state.formdataValid) {
    //   alert = (
    //     <CustomAlert
    //       variant="warning"
    //       class="alert__absolute"
    //       title={this.state.convertedCurrency + ' ' + defaultCurrency}
    //     />
    //   );
    // }
    //  else if(!this.state.formdata.amount.validation.valid && this.state.formdata.amount.validation.validationMessage) {
    //   alert = (
    //     <CustomAlert
    //       variant="danger"
    //       class="alert__absolute"
    //       title={this.state.formdata.amount.validation.validationMessage}
    //     />
    //   );
    // } else if(!this.state.formdata.currency.validation.valid && this.state.formdata.currency.validation.validationMessage) {
    //   alert = (
    //     <CustomAlert
    //       variant="danger"
    //       class="alert__absolute"
    //       title={this.state.formdata.currency.validation.validationMessage}
    //     />
    //   );
    // } else if(!this.state.formdataValid && this.state.formError) {
    //   alert = (
    //     <CustomAlert
    //       variant="danger"
    //       class="alert__absolute"
    //       title="Something went wrong with API"
    //     />
    //   );
    // } else if(this.state.formdataValid && this.state.formSuccess) {
    //   alert = (
    //     <CustomAlert
    //       variant="success"
    //       class="alert__absolute"
    //       title="Conversion successfully saved"
    //     />
    //   );
    // }

    return (
      <Form onSubmit={this.onSubmit}>
        {this.state.formdataValid && (
          <CustomAlert
            variant="warning"
            class="alert__absolute"
            title={this.state.convertedCurrency + ' ' + defaultCurrency}
          />
        )}
        <CustomInputGroup
          formdata={this.state.formdata.amount.config}
          inputRight={defaultCurrencySymbol}
          onChange={this.onChange}
        />
        <Select
          formdata={this.state.formdata.currency.config}
          onChange={this.onChange}
        />
        <CustomButton
          type="submit"
          value="Save conversion"
          variant="success"
          onChange={this.onChange}
          class="w-100"
          disabled={this.state.formdataValid ? false : true}
        />
      </Form>
    )
  }
}

ConversionsForm.propTypes = {
  addConversion: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ConversionsForm);