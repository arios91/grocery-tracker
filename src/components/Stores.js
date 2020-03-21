import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {fetchToDos} from '../actions/stores';


const Stores = ({store, fetchToDos}) => {
    useEffect(() => {
        fetchToDos();
    }, [fetchToDos])

    return (
        <div>
            Hello World
        </div>
    )
}

Stores.propTypes = {
    fetchToDos: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, {fetchToDos})(Stores);
