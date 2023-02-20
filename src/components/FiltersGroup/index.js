import CategoryItem from '../CategoryItem'
import RatingItem from '../RatingItem'
import './index.css'

const FiltersGroup = props => {
  const {
    updateTitleSearch,
    categoryOptions,
    ratingsList,
    updatecategory,
    updateRating,
    clickClearFilters,
  } = props

  const changeSearchElement = event => {
    if (event.key === 'Enter') {
      updateTitleSearch(event.target.value)
    }
  }

  const clearFilters = () => {
    clickClearFilters()
  }
  return (
    <div className="filters-group-container">
      {/* Replace this element with your code */}
      <input
        onKeyDown={changeSearchElement}
        placeholder="Search"
        className="search-element"
        type="search"
      />
      <h1 className="category-head">Category</h1>
      <div className="category-items-container">
        {categoryOptions.map(each => (
          <CategoryItem
            key={each.categoryId}
            updatecategory={updatecategory}
            categoryDetails={each}
          />
        ))}
      </div>
      <h1 className="category-head">Rating</h1>
      <ul className="category-items-container">
        {ratingsList.map(each => (
          <RatingItem
            key={each.ratingId}
            updateRating={updateRating}
            ratingDetails={each}
          />
        ))}
      </ul>
      <button onClick={clearFilters} className="clear-filter-btn" type="button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
