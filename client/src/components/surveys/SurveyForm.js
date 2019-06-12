import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends React.Component {
  renderFields() {
    return formFields.map(({name, label}) => {
      return (
        <Field 
          name={name} 
          component={SurveyField} 
          type="text" 
          label={label} 
          key={name} 
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
            <i className="material-icons right">close</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Review
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({name}) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  })

  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);