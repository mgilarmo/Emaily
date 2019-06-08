import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout 
        name="Emaily"
        description="$5.00 for 5 Email Credits"
        amount={500} // US Dollars in cents
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null, 
  actions
)(Payments);