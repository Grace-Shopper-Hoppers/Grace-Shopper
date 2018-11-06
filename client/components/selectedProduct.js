import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getSelectedProductThunk} from '../store/selectedProduct'
import { Link } from 'react-router-dom'
import AddReview from './addReview'

class SelectedProduct extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchSelectedProduct(id);
    }
    render() {
        const selectedProduct = this.props.selectedProduct
        const categories= selectedProduct.categories
        const users = selectedProduct.users
        const {isLoggedIn} = this.props
        return (
            <div id='selectedProduct'>
                <h2>The Deets!</h2>
                <h3>Scent: {selectedProduct.title}</h3>
                <img src={selectedProduct.imageUrl} alt="" className="img-responsive" />
                <h3>${selectedProduct.price}</h3>    
                <h4>Details: {selectedProduct.description}</h4>  

                <h5><ins>You might also like</ins></h5>
                {
                    selectedProduct && categories ? categories.map(index => {
                        return (
                            <li key={index}><Link to={`/categories/${index.id}`}><small>{index.content}</small></Link></li> 
                        )
                    }) : ('Sorry! No categories found.')
                }

                <h5><ins>Customer Reviews:</ins></h5>
                {
                    selectedProduct && users ? users.map(user => {
                        return (
                            <div key={user.id}>
                                <p><small><strong>Reviewer: {user.firstName}</strong></small></p>
                                <li><small> Rating: {user.review.numStars}</small></li> 
                                <li><small> {user.review.content}</small></li> 
                            </div>
                        )
                    }) : ('Sorry! No reviews yet. Be the first one!')    
                }
                <br />
                <Link to='/cart'> Go To Cart </Link>
                <br />
                <Link to="/products">Back to All Scents</Link>
                
                {/* if the user is not logged-in, they will NOT be able to view the AddReview feature! */}
                {isLoggedIn ? (
                    <AddReview />
                ) : (
                    null
                )}

            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Mapping STATE to PROPS in selectedProduct: ', state)
    return {
        isLoggedIn: !!state.user.id,
        selectedProduct: state.selectedProduct,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    console.log('Mapping PROPS to STATE in selectedProduct')
    return {
        fetchSelectedProduct: id => dispatch(getSelectedProductThunk(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)

/**
 * PROP TYPES
 */
SelectedProduct.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}
  