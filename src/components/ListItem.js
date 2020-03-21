import React, {Component} from 'react';
import {connect} from 'react-redux';
import {completeTodo} from '../actions/stores';

class ListItem extends Component {

  handleComplete = id => {
    const {completeTodo} = this.props;
    completeTodo(id);
  };
  
  render() {
    const{todoId, todo} = this.props;
    return (
      <div key="toDoName">
        <h4>
          {todo.title}
          <span onClick={() => this.handleComplete(todoId)}>
            <i>Done</i>
          </span>
        </h4>
      </div>
    );
  }
}

export default connect(null, {completeTodo})(ListItem);