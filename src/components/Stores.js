import React, {useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getStores} from '../actions/stores';
import {getItems} from '../actions/stores';
import Spinner from './layout/Spinner';
import StoreContainer from './StoreContainer'


const Stores = ({store, item, getStores, getItems}) => {
    useEffect(() => {
        getStores();
        getItems();
    }, [getStores, getItems])
    const STORE = '-- Store --'
    const LOCATION = '-- Location --'
    const ITEM = '-- Item --'

    // const [stores, setStores] = useState([...store.stores]);
    const [selectedStore, setSelectedStore] = useState(STORE);
    const [selectedStoreLocation, setSelectedStoreLocation] = useState(LOCATION);
    const [selectedItem, setSelectedItem] = useState('');

    const storeTypes = [...new Set(store.stores.map(tmpStore => tmpStore.name))];

    const handleStoreSelect = e => {
        let value = e.target.value;
        if(value === STORE){
            setSelectedStore(STORE);
        }else{
            setSelectedStore(value);
        }
        setSelectedStoreLocation(LOCATION);
    }
    const handleLocationSelect = e => {
        let value = e.target.value;
        if(value === STORE){
            setSelectedStoreLocation(LOCATION);
        }else{
            setSelectedStoreLocation(value);
        }
    }
    const handleItemSelect = e => {
        let value = e.target.value;
        if(value === STORE){
            setSelectedStore(STORE);
        }else{
            setSelectedStore(value);
        }
    }


    return store.loading && item.loading ? <Spinner/> :
    <div className="w-100">
        <div className="row mb-5">
            <div className="col-12 col-lg-6">
                <select className="form-control" onChange={e => handleStoreSelect(e)} id="storeSelect">
                    <option>{STORE}</option>
                    {storeTypes.map(store => <option key={store}>{store}</option>)}
                </select>
            </div>
            <div className="col-12 col-lg-6">
                <select className="form-control" onChange={e => handleLocationSelect(e)} id="locationSelect" disabled={selectedStore === STORE}>
                    <option>{LOCATION}</option>
                    {store.stores.filter(tmpStore => tmpStore.name === selectedStore).map(tmpStore => <option key={tmpStore.id}>{tmpStore.location}</option>)}
                </select>
            </div>
            {/* <div className="col-4 h-100">
                <select className="form-control" onChange={e => handleItemSelect(e)} id="itemSelect">
                    <option>{ITEM}</option>
                    {storeTypes.map(store => <option key={store}>{store}</option>)}
                </select>
            </div> */}
        </div>
        <Fragment>
            {store.stores.filter(tmpStore => tmpStore.name === selectedStore || selectedStore === STORE)
                .filter(tmpStore => tmpStore.location === selectedStoreLocation || selectedStoreLocation === LOCATION)
                .map(tmpStore => <StoreContainer key={tmpStore.id} store={tmpStore} items={item.items.filter(item => item.storeId === tmpStore.id)}/>)
            }
        </Fragment>
    </div>
}

Stores.propTypes = {
    getStores: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store,
    item: state.item
})

export default connect(mapStateToProps, {getStores, getItems})(Stores);
