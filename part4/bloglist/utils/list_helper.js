const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  return array.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);
};

const favoriteBlog = (array) => {
  //get the highes num in object
  /*   return array
    .map((arr) => arr.likes)
    .reduce((max, currentValue) => {
      return currentValue > max ? currentValue : max;
    }, -1); */

  return array.reduce(
    (max, currentValue) => {
      return currentValue.likes > max.likes ? currentValue : max;
    },
    { likes: -Infinity }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
