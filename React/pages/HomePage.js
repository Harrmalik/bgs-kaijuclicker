import React from 'react'
import moment from 'moment'
import Datetime from 'react-datetime'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Event from '../components/Event.js'

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class HomePage extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
          events: []
      }

      this.addEvent = this.addEvent.bind(this)
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

    addEvent(newEvent) {
        this.setState({events: [...this.state.events, newEvent]})
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

    toggleModal() {
        $('.ui.modal')
          .modal('toggle')
        ;
    }

    render(){
      return (
        <div>
            <div className="ui button blue" onClick={this.toggleModal}><i className="plus icon"></i> Add Event</div>

            <Event event={this.state.event} callback={this.addEvent}></Event>

            <DragAndDropCalendar
                selectable
                events={this.state.events}
                onEventDrop={this.moveEvent}
                defaultView='week'
                views = {['week']}
                titleAccesor= 'title'
                onSelectEvent={event => {
                    $('#title').val(event.title)
                    $('.ui.modal')
                      .modal('toggle')
                    ;}}
                onSelectSlot={(slotInfo) => {
                    $('#title').val('')
                    $($($('.rdt')[0]).children()[0]).val(slotInfo.start)
                    $($($('.rdt')[1]).children()[0]).val(slotInfo.start)
                    $('.ui.modal')
                      .modal('toggle')
                    ;
                }}
                />
        </div>
      )
    }
}

export default DragDropContext(HTML5Backend)(HomePage)
