import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Modal from 'react-modal'
import {updateItem} from '../actions/stores'
import {connect} from 'react-redux'

const StoreItem = ({item, updateItem}) => {
    const [displayModal, setShowModal] = useState(false);
    const [newQuantity, setNewQuantity] = useState(item.quantity);
    const showModal = () => {setShowModal(true)};
    const closeModal = () => {
        setShowModal(false);
        setNewQuantity(QUANTITY);
    };
    const QUANTITY = '-- New Quantity --';
    const quantitiesArr = ['None', 'Low', 'Moderate', 'Plenty'];

    const validateItem = e => {
        e.preventDefault();
        item.updateDate = new Date();
        item.verified = true;
        updateItem(item);
    }

    const handleQuantityUpdate = e =>{
        let value = e.target.value;
        if(value !== QUANTITY){
            setNewQuantity(value);
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        if(newQuantity !== QUANTITY){
            item.quantity = newQuantity;
            updateItem(item);
            closeModal();
        }else{

        }
    }

    const customStyles = {
        overlay:{
            background: 'rgba(33, 37, 41, 0.3411764705882353)'
        },
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
        }
    }

    return (
        <Fragment>
            <div className='col-12 row itemContainer'>
                <div className="col-9 row itemSubContainer">
                    <div className="col-8 col-lg-4 pl-2">
                        <b>{item.name}</b><br/>
                        <small>Updated: <Moment format="MM/DD h:mma" date={item.updateDate.toDate()}/></small>
                    </div>
                    <div className={item.quantity === 'None' ? "col-4 col-lg-8 p-0 noQuantity" : item.quantity === 'Low' ? "col-4 col-lg-8 p-0 lowQuantity": "col-4 col-lg-8 p-0 plentyQuantity"}>
                        {item.quantity}
                    </div>
                </div>
                <div className="col-3 row itemSubContainer">
                    <div className="col-12 mb-1">
                        <button className="btn btn-primary btn-block" onClick={e => showModal()}>Update</button>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-success btn-block" onClick={e => validateItem(e)}>Verify</button>
                    </div>
                </div>
            </div>
            <Modal
                id="orderDetailsModal"
                isOpen={displayModal} 
                onRequestClose={closeModal} 
                ariaHideApp={false}
                style={customStyles}>
                <div className="modalContainer row">
                    <div className="col-12 text-center mb-4">
                        <b>Update {item.name}</b>
                    </div>
                    <form className="form col-12 row" onSubmit={e => handleSubmit(e)}>
                        <div className="col-6 mb-3">Quantity:&nbsp;</div>
                        <div className="col-6 mb-3">
                            <select className="form-control" onChange={e => handleQuantityUpdate(e)} id="quantitySelect">
                                <option>{QUANTITY}</option>
                                {quantitiesArr.map(item => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <input type="submit" className='col-12' value="Update" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </Modal>
        </Fragment>
    )
}

StoreItem.propTypes = {
    item: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired,
}

export default connect(null, {updateItem})(StoreItem)
