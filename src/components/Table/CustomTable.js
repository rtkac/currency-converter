import React from 'react';
import uuid from 'uuid';
import './CustomTable.scss';
import Table from 'react-bootstrap/Table';

const CustomTable = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.tableHead.map(tableHeadItem => (
            <th key={tableHeadItem.name}>{tableHeadItem.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {props.tableRows.map(tableRowItem => (
        <tr key={uuid()}>
          <td>
            <span className="font-weight-bold">
              {tableRowItem.value}
            </span>&nbsp;
            {tableRowItem.valueCurrency}
          </td>
          <td>
            <span className="font-weight-bold">
              {tableRowItem.convertedValue}
            </span>&nbsp;
            {tableRowItem.convertedValueCurrency}
          </td>
        </tr>
      ))} 
      </tbody>
      <tfoot>
        <tr>
          <td>sum</td>
          <td>{ props.tableFoot }</td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default CustomTable;