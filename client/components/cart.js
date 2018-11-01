import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import product, { setNewProduct } from '../store/product'
import CartItems from './cartItems'

//add a select item button on the main view page and individual for customer to purchase product
//it will either add data to database (validated user) OR to sessionStorage
// it should be an array of objects - that should contain quanitity (that we keep track of!)
// from ORDER PRODUCT (which has all the fields we need)
// we can eager load or join them if needed

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            orderProduct: [],
            isLoggedIn: false
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.total = this.total.bind(this)
    }

    componentDidMount(){
        if (this.props.user.id){
            //populate local state with the session
            /* OR this.setState({isLoggedIn: true}) -- put in IF */
        } else {
            const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));

            console.log('orderProduct in CART', orderProduct);
            if (orderProduct) {
              this.setState({orderProduct})
            }
            this.setState({isLoggedIn: false})
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        // need to add to sessionStorage
        // if (!this.state.isLoggedIn){
        //     sessionStorage.setItem('orderProduct', this.state)
        // }
    }
    handleSubmit(e){
        e.preventDefault()
        // this.props.setNewProduct(this.state)
        this.setState({
            items: []
        })
    }
    total(){
        return this.state.orderProduct.reduce((sumTotal, orderProduct) => {
            const productTotal = orderProduct.quantity * orderProduct.price
            return sumTotal + productTotal
        }, 0)
    }
    render(){
        return(
          <div>
              <div>
                  <h2>Total Price: ${this.total()}</h2>
              </div>
          {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            )
          }
          <div>
            <Link to='/checkout'><button type='submit' onSubmit={this.handleSubmit}>Checkout</button></Link>
          </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user
    }
}

// const mapDispatchToProps = (dispatch) => {
    // return {
    //     setNewProduct: (newProduct) => dispatch(setNewProduct(newProduct))
    // }
// }

export default connect(mapStateToProps, null)(Cart)
