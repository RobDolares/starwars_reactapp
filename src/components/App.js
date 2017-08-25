import React, {Component} from 'react';
import '../styles/App.css';

class App extends Component {
  // PROPS AND STATE
  // Set props and state below.
  // You should set state for vehicles (empty array), value (empty string), pilot (empty) string.
  // Enter your code below:
  constructor(props) {
    super(props)

    this.state = {
      vehicles: [],
      name: '',
      pilot: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // FORM: HANDLE INPUT CHANGES
  // handleNameChange below:
  // See form lesson for details.
  // Enter your code below:
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  //  FORM: SUBMIT METHOD
  // handleSubmit below:
  // See form lesson for details.
  // Once the form is submitted, two things need to happen: set the state of pilot to the input value.
  // Then, set the value of the input back to an empty string.
  // Enter your code below:

  handleFormSubmit(e) {
    e.preventDefault()
    this.setState({pilot: this.state.name, name: ''})
  }

  // LIFECYCLE
  // Which lifecycle is best for fetching data?
  // Inside this lifecycle, you will fetch the vehicles from here: https://swapi.co/api/vehicles/
  // Once you have fetched that data, set the state of vehicles to the fetched data.
  // In your response look for 'results'. It should return this array.
  // You will want to use this array when you set the state of 'vehicles'. You will need this data in your render.
  // Enter your code below:

  componentWillMount() {
    fetch('https://swapi.co/api/vehicles/').then(r => r.json()).then((json) => {
      console.log("Data from componentWillMount fetch", json.results);
      this.setState({vehicles: json.results})
    })
  }

  // RENDER
  // Before you can map over the data you've fetched, you will first need to store that 'state' in a variable.
  // Map over the data.
  // Don't forget to set the 'key'. In this case, use the vehicle name.
  // You will need the following values: name, model, manufacturer, class, passengers, crew, length, max speed, and cargo capacity.
  // Rendering: create a 'card' for each of the vehicles. consult the Bootstrap 4 docs for details.
  // Enter your code below:

  render() {
    /*
    Store vehicles state in a variable.
    Map over this variable to access the values needed to render.
    */

    let vehicles = this.state.vehicles.map((vehicle) => {
      return (
        <div className="col-md-4" key={vehicle.name}>
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">Vehicle: {vehicle.name}</h4>
              <h5 className="card-subtitle text-muted">Model: {vehicle.model}</h5>
              <div className="card card-block">
                <h5 className="text-muted">Specs</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Mfr: {vehicle.manufacturer}</li>
                  <li className="list-group-item">Class: {vehicle.vehicle_class}</li>
                  <li className="list-group-item">Passengers: {vehicle.passengers}</li>
                  <li className="list-group-item">Crew: {vehicle.crew}</li>
                  <li className="list-group-item">length: {vehicle.length}
                    meters</li>
                  <li className="list-group-item">Max Speed: {vehicle.max_atmosphering_speed}
                    kph</li>
                  <li className="list-group-item">Cargo Capacity: {vehicle.cargo_capacity}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      )

    })

    /*The App component needs the following: jumbotron section, form section, vehicle cards section. Your form will also need a header in which you will pass the state of the form upon submit. */

    return (
      <div className="App">
        <section className="jumbotron">
          <h1 className="display-3">Star Wars</h1>
          <hr className="my-4"></hr>
          <p>The Vehicles of Star Wars</p>
        </section>
        <section className="card card-block form">
          <div className="col-md-12">
            <h3>What is your name pilot?</h3>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group col-md-4 offset-md-4">
                <input value={this.state.name} onChange={this.handleNameChange} className="form-control" name="name" rows="1" type="text" placeholder="Enter your name"/>
              </div>
              <button className="btn btn-primary btn-lg" type="submit" value="Submit">Submit</button>
            </form>
            <div>
              <h2>{this.state.pilot}</h2>
            </div>
          </div>
        </section>
        <section className="row">
          {vehicles}
        </section>

      </div>
    )
  }
}

export default App;
