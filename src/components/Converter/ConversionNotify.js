import React, { Component } from 'react';
import CustomAlert from '../Alert/CustomAlert';

// redux
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { notify: state.notify }
};

class NotifyAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }
  }

  timer = 0;
  
  componentWillReceiveProps() {
    this.setState({ show: true });
    
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ show: false }), 2000);
  }

  Notify = ({ notify }) => {
    if(this.state.show && this.props.notify.message && this.props.notify.messageType) {
      return (
        <CustomAlert
          variant={this.props.notify.messageType}
          title={this.props.notify.message}
          class="alert__notify"
        />
      )
    } else {
      return null
    }
  }
  
  render() {
    return (
      this.Notify(this.props.notify)
    )
  }
}

const NotifyComponent = connect(mapStateToProps)(NotifyAlert);

export default NotifyComponent;