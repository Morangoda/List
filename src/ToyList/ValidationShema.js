export const validationShema = {
  toyName: (value) => {
    if (value.length === 0) {
      return "Need to fill Toy Name";
    }
  },
  color: (value) => {
    if (!value) {
      return "Need to choose color";
    }
  },
  number: (value) => {
    if (value <= 0) {
      return "Might be more than 0";
    }
  },
};
