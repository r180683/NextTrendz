import './index.css'

const CategoryItem = props => {
  const {updatecategory, categoryDetails} = props
  const {categoryId, name} = categoryDetails

  const categoryItemClick = () => {
    updatecategory(categoryId)
  }

  return (
    <button onClick={categoryItemClick} className="category-btn" type="button">
      <p>{name}</p>
    </button>
  )
}

export default CategoryItem
