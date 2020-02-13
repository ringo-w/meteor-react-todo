import React from "react";
import ToDoInput from "../../../components/ToDoInput";
import ClearButton from "../../../components/ClearButton";
import ToDoCount from "../../../components/ToDoCount";
import ToDoItem from "../../../components/ToDoItem";
import Header from "../../../components/Header";
import "./styles.css";
import { ToDos } from "../../../api/todos";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from "../../../components/AccountWrapper";
import { Meteor } from "meteor/meteor";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
  }

  // checkbox
  toggleComplete = todo => {
    // ToDos.update(todo._id, { $set: { complete: !todo.complete } });
    Meteor.call("todos.toggleComplete", todo); // new
  };
  // trash can
  removeTodo = todo => {
    // ToDos.remove(todo._id);
    Meteor.call("todos.removeTodo", todo);
  };
  // clear button
  removeCompleted = () => {
    // const completedTodos = this.props.todos
    //   .filter(todo => todo.complete === true)
    //   .map(todo => todo._id);

    // completedTodos.map(id => {
    //   ToDos.remove(id);
    // });
    Meteor.call("todos.removeCompleted");
  };

  // add new tasks
  addToDo = event => {
    event.preventDefault();
    // ToDos.insert({ title: this.toDoInput.current.value, complete: false });
    let title = this.toDoInput.current.value;
    Meteor.call("todos.addToDo", title);
    this.toDoInput.current.value = "";
  };

  hasCompleted = () => {
    let hasCompleted = this.props.todos.filter(todo => todo.complete);
    return hasCompleted.length > 0 ? true : false;
  };

  render() {
    let { todos } = this.props;
    let number = todos.length;
    // Header component to display the Header

    return (
      <div className="appWrapper">
        {!this.props.userId ? (
          <div className="login-wrapper">
            <AccountsUIWrapper />
          </div>
        ) : (
          <div className="App">
            <div className="todo-list">
              <Header title="SO MUCH TO DO" />
              <ToDoInput addToDo={this.addToDo} ref={this.toDoInput} />
              <ul>
                {todos.map(todo => {
                  return (
                    <ToDoItem
                      key={todo._id}
                      todo={todo}
                      creator="Ringo"
                      toggleComplete={() => {
                        this.toggleComplete(todo);
                      }}
                      removeTodo={this.removeTodo}
                    />
                  );
                })}
              </ul>
              <div className="todo-admin">
                <ToDoCount number={number} />
                {<ClearButton removeCompleted={this.removeCompleted} />}
                <button onClick={Meteor.logout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
// withTracker will turn it into props
export default withTracker(() => {
  Meteor.subscribe("todos"); // new

  return {
    todos: ToDos.find({}).fetch(),
    userId: Meteor.userId(),
    user: Meteor.user()
  };
})(App);
