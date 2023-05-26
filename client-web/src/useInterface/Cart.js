import React from 'react'
import "./cart.css"

const Cart = () => {
  return (
    
  <div className="container">
    {/* <!-- Shopping cart table --> */}
    <div className="card">
      <div className="card-header">
        <h2>Shopping Cart</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {/* <!-- Set columns width --> */}
                <th className="text-center" style={{minWidth: "400px"}}>Product Name &amp; Details</th>
                <th className="text-right" style={{minWidth: "160px"}}>Price</th>
                <th className="text-center"style={{minWidth: "120px"}}>Quantity</th>
                <th className="text-right" style={{minWidth: "160px"}}>Total</th>
                <th className="text-center"style={{minWidth: "90px"}}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="media">
                    <img src="https://via.placeholder.com/40x40" alt="Product Image"/>
                    <div className="media-body">
                      <h4 className="text-dark">Product Name</h4>
                      <p className="text-muted">Product Description</p>
                    </div>
                  </div>
                </td>
                <td className="text-right">$40.00</td>
                <td className="text-center">
                  <div className="input-group">
                    <input type="number" className="form-control" value="1"/>
                    <button className="btn btn-default">Update</button>
                  </div>
                </td>
                <td className="text-right">$40.00</td>
                <td className="text-center">
                  <button className="btn btn-danger">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- End shopping cart table --> */}
    <div className="mt-4 d-flex justify-content-between align-items-center">
      <a href="#" className="btn btn-primary">Continue Shopping</a>
      <div className="text-right">
        <p className="text-muted mr-3 pb-4">Subtotal: $40.00</p>
        <p className="text-muted mr-3">Shipping: Free</p>
        <h3 className="text-large text-dark mr-5 mt-2">Total: $40.00</h3>
      </div>
      <a href="#" className="btn btn-primary">Proceed to Checkout</a>
    </div>
  </div>

  )
}

export default Cart