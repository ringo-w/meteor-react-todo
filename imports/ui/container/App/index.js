import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "John",
      lastName: "Smith"
    };
  }

  render() {
    return (
      <div>
        <h1>My First Meteor App</h1>
        <form
          onSubmit={event => {
            event.preventDefault();

            const data = {
              firstName: event.target.firstName.value,
              lastName: event.target.lastName.value
            };

            this.setState(data); // update state
          }}
        >
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <br />
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <br />
          <br />
          <input type="submit" value="Update Names" />
        </form>
        <br />
        <br />
        <br />
        <br />
        <h3>Current state for the following variables: </h3>
        <p>First Name: {this.state.firstName}</p> // display state
        <p>Last Name: {this.state.lastName}</p>
      </div>
    );
  }
}
export default App;
