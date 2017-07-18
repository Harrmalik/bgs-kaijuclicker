import React from 'react'
import moment from 'moment'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class HomePage extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
          events: []
      }

      this.moveEvent = this.moveEvent.bind(this)
    }

    componentDidMount() {
        let component = this

        let events = [{
            title: 'Malik Harrison - 40401',
            start: moment().hour(4)._d,
            end: moment().hour(6)._d
        }]

        this.setState({ events })
    }

    moveEvent({ event, start, end }) {
      const { events } = this.state;

      const idx = events.indexOf(event);
      const updatedEvent = { ...event, start, end };

      const nextEvents = [...events]
      nextEvents.splice(idx, 1, updatedEvent)

      this.setState({
        events: nextEvents
      })

      alert(`${event.title} was dropped onto ${event.start}`);
    }

    showModal() {
        $('.ui.modal')
          .modal('show')
        ;
    }

    render(){
      return (
        <div>
            <div className="ui button blue"><i className="plus icon"></i> Add Event</div>

            <div className="ui modal">
              <div className="header">Header</div>
              <div className="content">
              <form className="ui form">
                <div className="field">
                  <label>Event</label>
                  <input type="text" name="title" placeholder="Name - Extension"></input>
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" name="last-name" placeholder="Last Name"></input>
                </div>
                <div className="field">
                  <div className="ui checkbox">
                    <input type="checkbox" tabindex="0" className="hidden"></input>
                    <label>I agree to the Terms and Conditions</label>
                  </div>
                </div>
                </form>
              </div>
              <div className="actions">
                <div className="ui blue button">Save</div>
                <div className="ui basic button">Cancel</div>
              </div>
            </div>

            <DragAndDropCalendar
                selectable
                events={this.state.events}
                onEventDrop={this.moveEvent}
                defaultView='week'
                views = {['week']}
                titleAccesor= 'title'
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={(slotInfo) => alert(
                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}`
                )}
                />
        </div>
      )
    }
}

export default DragDropContext(HTML5Backend)(HomePage)
