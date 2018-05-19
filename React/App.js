'use strict'
import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            kills: 0,
            killsPerSecond: 0,
            kaijus: 0,
            birthKaijuLevel: 0,
            birthKaijuCost: 15,
        }

        this.spendKills = this.spendKills.bind(this)
        this.birthKaiju = this.birthKaiju.bind(this)
    }

    componentDidMount() {
        let component = this;
        setInterval(() => {
            console.log(component.state.kills);
            console.log(component.state.killsPerSecond);
            console.log(component.state.kills + component.state.killsPerSecond);
            component.setState({kills: component.state.kills + component.state.killsPerSecond})
         }, 1000);
    }

    spendKills(e) {
        let skill = e.target.id,
            levelLabel = `${skill}Level`,
            level = this.state[levelLabel]

        this[skill](levelLabel, level);
    }

    birthKaiju(levelLabel, level) {
        this.setState({levelLabel: this.state[levelLabel] + 1, killsPerSecond: this.state.killsPerSecond + 0.1})
    }

    render() {
        let state = this.state;
        console.log(state);
        return (
            <section id="app">
                <div id="clickerpane" className="pane">
                    <p>{state.kills.toFixed(0)} kills</p>
                    {state.killsPerSecond > 0 ? <p>per second: {state.killsPerSecond}</p> : null }
                    <img
                        src="https://vignette.wikia.nocookie.net/clubpenguin/images/7/70/Cookie.png/revision/latest?cb=20121202153516"
                        style={{width:'33%'}}
                        onClick={() => this.setState({kills: state.kills + 1})}/>
                </div>
                <div id="mainpane" className="pane">
                    <p>placeholder</p>
                </div>
                <div id="upgradepane" className="pane">
                    <div>
                        <p id="birthKaiju" onClick={this.spendKills} className={state.kills >= state.birthKaijuCost ? "active" : "inactive"}>Birth Kaiju <span>{state.birthKaijuCost}</span></p>
                    </div>
                </div>
            </section>
        )
    }
}



ReactDom.render(<App/>,document.getElementById('react-app'))
