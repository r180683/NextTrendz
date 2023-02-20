import './index.css'

const RatingItem = props => {
  const {ratingDetails, updateRating} = props
  const {imageUrl, ratingId} = ratingDetails

  const clickRating = () => {
    updateRating(ratingId)
  }

  return (
    <li>
      <button className="rating-btn" onClick={clickRating} type="button">
        <img
          className="rating-image"
          alt={`rating ${ratingId}`}
          src={imageUrl}
        />
      </button>
    </li>
  )
}

export default RatingItem
