function filterValidContent(content) {
  const currentDate = new Date();

  return content.filter((content) => {
    if (!content.startDate && !content.endDate) {
      // neither start nor end date is give = start showing now
      return true;
    }

    if (content.startDate && !content.endDate) {
      // If startDate is set but endDate is not, content is valid if startDate is in the future
      return currentDate.toISOString() >= content.startDate.toISOString();
    }

    if (!content.startDate && content.endDate) {
      // If endDate is set but startDate is not, content is valid if endDate is in the past
      return currentDate.toISOString() <= content.endDate.toISOString();
    }

    // If both startDate and endDate are specified, content is valid if startDate is in the past and endDate is in the future
    return (
      currentDate.toISOString() >= content.startDate.toISOString() &&
      currentDate.toISOString() <= content.endDate.toISOString()
    );
  });
}

module.exports = filterValidContent;
