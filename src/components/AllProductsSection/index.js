import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    titleSearch: '',
    rating: '',
    apiSuccess: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, titleSearch, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      console.log(updatedData)
      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiSuccess: true,
      })
    } else if (response.ok === false) {
      this.setState({isLoading: false, apiSuccess: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  updateTitleSearch = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, apiSuccess} = this.state

    if (apiSuccess === false) {
      return this.renderFailureView()
    }

    // TODO: Add No Products View
    if (productsList === []) {
      console.log(productsList)
      return (
        <div className="no-products-container">
          <img
            className="no-products-image"
            alt="no products"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          />
          <h1 className="no-products-found-head">No Products Found</h1>
          <p className="no-products-description">
            We could not find any products.Try other filters
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="products-failure-image"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="no-products-found-head">Oops! Somwthing Went Wrong</h1>
      <p className="no-products-description">
        We are having some trouble processing your request .Please try again.
      </p>
    </div>
  )

  updatecategory = id => {
    this.setState({category: id, isLoading: true}, this.getProducts)
  }

  updateRating = id => {
    this.setState({rating: id, isLoading: true}, this.getProducts)
  }

  clickClearFilters = () => {
    this.setState(
      {
        rating: '',
        isLoading: true,
        activeOptionId: sortbyOptions[0].optionId,
        category: '',
        titleSearch: '',
      },
      this.getProducts,
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          updatecategory={this.updatecategory}
          updateTitleSearch={this.updateTitleSearch}
          updateRating={this.updateRating}
          clickClearFilters={this.clickClearFilters}
        />
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
