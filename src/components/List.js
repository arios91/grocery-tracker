import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addTodo} from '../actions/stores';

const List = ({addTodo}) => {
    const [todoText, setTodo] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        addTodo(todoText);
    }

    const onChange = e => {setTodo(e.target.value)};

    return (
        <form className="form" onSubmit={e => onSubmit(e)}>
            <input type="text" placeholder="todo" onChange={e => onChange(e)}/>
            <input type="submit" value="Add Todo" className="btn btn-primary"/>
        </form>
    )
}

List.propTypes = {
    addTodo: PropTypes.func.isRequired,
}

export default connect(null, {addTodo})(List)
