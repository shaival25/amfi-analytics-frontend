import Questions from './Questions'
const FeedbackInsights = ({ feedbackInsights }) => {
  return (
    <div className='grid grid-cols-3 gap-2 '>
      {Object.keys(feedbackInsights).map((feedback, index) => (
        <Questions
          barData={feedbackInsights[feedback]}
          index={index}
          key={index}
        />
      ))}
    </div>
  )
}

export default FeedbackInsights
