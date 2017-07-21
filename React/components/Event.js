import React from 'react'
import moment from 'moment'
import Datetime from 'react-datetime'

class Event extends React.Component {
    constructor(props) {
        super(props)

        this.state = {...props.event}

        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    saveEvent() {
        this.props.callback(this.state)
        this.toggleModal()
        this.setState({})
    }

    toggleModal() {
        $('.ui.modal')
          .modal('toggle')
        ;
    }

    render() {
        let component = this
        return (
            <div className="ui modal">
              <div className="header">Header</div>
              <div className="content">
              <form className="ui form">
                <div className="field">
                  <label>Event</label>
                  <input type="text" name="title" id="title" placeholder="Name - Extension" onBlur={this.handleInputChange}></input>
                </div>

                <div className="two fields">
                    <div className="field">
                      <label>Start Time</label>
                      <Datetime onBlur={(datetime) => {
                          component.setState({start: moment(datetime)._d })
                      }}/>
                    </div>

                    <div className="field">
                      <label>End Time</label>
                      <Datetime onBlur={(datetime) => {
                          component.setState({end: moment(datetime)._d })
                      }}/>
                    </div>
                </div>

                <div className="field">
                  <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" onBlur={this.handleInputChange}></input>
                    <label>I agree to the Terms and Conditions</label>
                  </div>
                </div>
                </form>
              </div>
              <div className="actions">
                <div className="ui blue button" onClick={this.saveEvent}>Save</div>
                <div className="ui basic button" onClick={this.toggleModal}>Cancel</div>
              </div>
            </div>
        )
    }
}

export default Event
