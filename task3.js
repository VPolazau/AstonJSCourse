const createLiker = () => {
  let rating = 0;

  return {
    like() {
      rating++;
      return this;
    },
    dislike() {
      rating--;
      return this;
    },
    val() {
      return rating;
    },
  };
};