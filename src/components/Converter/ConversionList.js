import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

// constants
import { defaultCurrency } from '../../constants/others';

// custom components
import CustomTable from '../Table/CustomTable';

// redux
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { conversions: state.conversions.conversions }
};

const table = {
  tableHead: [
    {name: 'value'},
    {name: 'converted value'}
  ]
}

const ConversionList = ({ conversions }) => {

  let sum = 0;

  if(conversions.length > 0) {
    
    sum = conversions.reduce(function (accumulator, currentValue) {
      return parseFloat(accumulator) + parseFloat(currentValue.value);
    }, 0);

    sum = sum.toFixed(2);

    return (
      <Fade>
        <CustomTable
          tableHead={table.tableHead}
          tableRows={conversions}
          tableFoot={`${sum} ${defaultCurrency}`}
        />
      </Fade>
    )
  } else {
    return (
      <p className="text-center">No conversions</p>
    )
  }
}

ConversionList.propTypes = {
  conversions: PropTypes.array,
  defaultCurrency: PropTypes.string
}

const List = connect(mapStateToProps)(ConversionList);

export default List;