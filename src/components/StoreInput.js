import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addStore} from '../actions/stores';

const StoreInput = ({addStore}) => {
    const [formData, setFormData] = useState({
        name: 'Target',
        location: '',
        address: ''
    });

    const {
        name,
        location,
        address
    } = formData;

    const onSubmit = async e => {
        e.preventDefault();
        if(name === '' || location === '' || address === ''){
            alert("All fields are required")
        }else{
            addStore(formData);
            setFormData({name: 'Target', location: '', address: ''})
        }
    }

    const onChange = e => {setFormData({...formData, [e.target.name]: e.target.value})}

    return (
        <form className="form" onSubmit={e => onSubmit(e)}>
            <input type="text" placeholder="name" name='name' value={name} onChange={e => onChange(e)} required disabled/><br/>
            <input type="text" placeholder="location" name='location' value={location} onChange={e => onChange(e)} required/><br/>
            <input type="text" placeholder="address" name='address' value={address} onChange={e => onChange(e)} required/><br/>
            <input type="submit" value="Add Todo" className="btn btn-primary"/>
        </form>
    )
}

StoreInput.propTypes = {
    addStore: PropTypes.func.isRequired,
}

export default connect(null, {addStore})(StoreInput)
