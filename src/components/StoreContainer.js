import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Collapse} from 'react-collapse'
import Modal from 'react-modal'
import {connect} from 'react-redux';
import {addItemToStore} from '../actions/stores';
import StoreItem from './StoreItem';

const StoreContainer = ({store, items, addItemToStore}) => {
    const QUANTITY = '-- New Quantity --';
    const quantitiesArr = ['None', 'Low', 'Moderate', 'Plenty'];
    const [collapse, setCollapse] = useState(false);
    const [displayModal, setShowModal] = useState(false);
    const [newQuantity, setNewQuantity] = useState(QUANTITY);
    const [itemData, setItemData] = useState({
        itemName: '',
        quantity: '',
    })

    const {itemName, quantity} = itemData;

    const showModal = () => {setShowModal(true)};

    const closeModal = () => {setShowModal(false)};

    const onChange = e => {setItemData({...itemData, [e.target.name]: e.target.value})}

    const handleCollapse = (e) => {
        e.preventDefault();
        setCollapse(!collapse);
    }

    const handleQuantityUpdate = e =>{
        let value = e.target.value;
        if(value !== QUANTITY){
            setNewQuantity(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newQuantity === QUANTITY){
            alert('Invalid quantity');
        }else{
            addItemToStore(({
                name: itemName,
                quantity: newQuantity,
                stocked: true,
                storeId: store.id,
                updateDate: new Date(),
                verified: true,
            }))
            setItemData({name: '', quantity: ''});
            setNewQuantity(QUANTITY);
            closeModal();
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
            <div className="row">
                <div className="col-12 text-left font-weight-bold storeItemContainer mb-3" onClick={e => handleCollapse(e)}>
                    {store.name} @ {store.location}<br/>
                    <small>{store.address}</small><br/>
                </div>
            </div>
            <Collapse isOpened={collapse}>
                <div className="row mb-2 itemList">
                    <button className="btn btn-light btn-block col-12 addItemButton" onClick={e => showModal()}>Add Item </button>
                    {items.map(item => <StoreItem key={item.id} item={item}/>)}
                </div>
            </Collapse>
            <Modal
                id="orderDetailsModal"
                isOpen={displayModal} 
                onRequestClose={closeModal} 
                ariaHideApp={false}
                style={customStyles}>
                <div className="modalContainer row">
                    <div className="col-12">
                        <b>Add Item to {store.name} @ {store.location}</b>
                    </div>
                    <form className="form col-12 row" onSubmit={e => handleSubmit(e)}>
                        <input type="text" className='col-12 mb-2' placeholder="Item Name" name='itemName' value={itemName} onChange={e => onChange(e)} required/><br/>
                        <select className="form-control" onChange={e => handleQuantityUpdate(e)} id="quantitySelect">
                            <option>{QUANTITY}</option>
                            {quantitiesArr.map(item => <option key={item}>{item}</option>)}
                        </select><br/>
                        <input type="submit" className='col-12' value="Add Item" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </Modal>
        </Fragment>
    )
}

StoreContainer.propTypes = {
    store: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    addItemToStore: PropTypes.func.isRequired
}

export default connect(null, {addItemToStore})(StoreContainer)
