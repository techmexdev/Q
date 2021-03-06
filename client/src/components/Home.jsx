import React, { Component } from 'react';
import './Home.css';
import Nav from './Nav';
import EventsList from './EventsList';
import FilterBox from './FilterBox';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      currentLocation: null,
      sortByAmount: false,
      sortByDate: false,
      loggedIn: null,
    };
    this.getQsFromDB = this.getQsFromDB.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.toggleSortByDate = this.toggleSortByDate.bind(this);
    this.toggleSortByAmount = this.toggleSortByAmount.bind(this);
    this.turnOffSorts = this.turnOffSorts.bind(this);
    this.handleCreateQ = this.handleCreateQ.bind(this);
  }

  componentDidMount() {
    this.getQsFromDB();
  }

  getQsFromDB() {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          events: json,
          locations: json.map(event => `${event.city}, ${event.state}`).filter((elem, index, self) =>
            index === self.indexOf(elem)),
        });
      });
  }
  setLocation(loc) {
    this.setState({
      currentLocation: loc,
    });
  }

  toggleSortByDate() {
    this.setState({
      sortByDate: !this.state.sortByDate,
    });
  }

  toggleSortByAmount() {
    this.setState({
      sortByAmount: !this.state.sortByAmount,
    });
  }

  turnOffSorts() {
    this.setState({
      sortByAmount: false,
      sortByDate: false,
    });
  }

  handleCreateQ() {
    this.getQsFromDB();
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <Nav
            handleCreateQ={this.handleCreateQ}
            userId={this.state.loggedIn}
          />
          <h2>Welcome to Q</h2>
        </div>
        <p className="Home-intro">
          Sign-up, stand in line, make money.
          <br />
          <br />
        </p>
        <FilterBox
          locations={this.state.locations}
          setLocation={this.setLocation}
          toggleSortByDate={this.toggleSortByDate}
          toggleSortByAmount={this.toggleSortByAmount}
          turnOffSorts={this.turnOffSorts}
        />
        <EventsList
          style={{ width: 250, margin: '0 auto' }}
          events={this.state.events}
          currentLocation={this.state.currentLocation}
          sortByDate={this.state.sortByDate}
          sortByAmount={this.state.sortByAmount}
        />
      </div>
    );
  }
}

export default Home;
