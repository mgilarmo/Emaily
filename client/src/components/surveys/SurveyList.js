import React from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleString()}
            </p>
          </div>
          <div className="card-action">
            <a href="">Yes: {(survey.yes).toLocaleString()}</a>
            <a href="">No: {(survey.no).toLocaleString()}</a>
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

const mapStateToProps = ({surveys}) => {
  return {surveys}
}

export default connect(
  mapStateToProps,
  {fetchSurveys}
)(SurveyList);