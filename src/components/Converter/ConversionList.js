import React from 'react';
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

  if(conversions.length > 0) {
    
    var sum = conversions.reduce(function (accumulator, currentValue) {
      return parseFloat(accumulator) + parseFloat(currentValue.value) + ` ${defaultCurrency}`;
    }, 0);

    return (
      <Fade>
        <CustomTable
          tableHead={table.tableHead}
          tableRows={conversions}
          tableFoot={sum}
        />
      </Fade>
    )
  } else {
    return (
      <p className="text-center">No conversions</p>
    )
  }
}

const List = connect(mapStateToProps)(ConversionList);

export default List;