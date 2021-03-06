import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { removeItem } from '../reducers/shopItems'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Catalog extends Component {

  // Get total quantity Sum for each item
  itemQuantitySum = (quantity) => {
    return (quantity.small + quantity.medium + quantity.large);
  }

  // Get total products in the store
  totalQuantitySum = (items) =>{
    const total = items.reduce(
      ( itemsTotal, currentItem ) => itemsTotal + this.itemQuantitySum(currentItem.quantity),
      0
    );
    return total;
  }

  // Get total price of all products
  totalPriceSum = (items) => {
    const total = items.reduce(
      ( itemsTotal, currentItem ) => itemsTotal + currentItem.price,
      0
    );
    return total;
  }

  renderCatalog = (items) => {
    return items.map( (item, index) => {
      return (
        <tr key={item.id}>
          <td className="product-thumbnail">
            <img src={item.display_src} alt="item" className="img-fluid" />
          </td>
          <td className="product-name">
            <h2 className="h5 text-black">{item.name}</h2>
          </td>
          <td>${item.price}</td>
          <td>{this.itemQuantitySum(item.quantity)}</td>
          <td>
            <Link to={{pathname: '/catalog/edit',  state: index}} className="btn btn-primary btn-sm">
              Update
            </Link>
          </td>
          <td>
            <button onClick={ () => this.props.removeItem(index) } className="btn btn-primary btn-sm">X</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { shopItems } = this.props.shopItems;
    return (
      <div className="site-wrap">
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <Link to="/catalog/add" className="btn btn-primary btn-sm btn-block">Add New Item</Link>
                  </div>
                  <div className="col-md-6">
                    <Link to="/catalog/add-category"className="btn btn-outline-primary btn-sm btn-block">
                      Add New Category
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Catalog Totals</h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">Number of Items</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{this.totalQuantitySum(shopItems)}</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total Amount</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${this.totalPriceSum(shopItems)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="site-blocks-table">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Update</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderCatalog(shopItems)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}
const mapStateToProps = ({shopItems}) => ({shopItems});

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ removeItem }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Catalog);
