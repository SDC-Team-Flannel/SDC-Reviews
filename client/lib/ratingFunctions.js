//Returns the recommended percentage based on an object that contains {true: x, false: y}
export const recommendedPercentage = (recommended) => {
  if (!recommended) {
    return 0;
  }
  let t = parseInt(recommended.true || 0);
  let f = parseInt(recommended.false || 0);
  if (t + f === 0) {
    return 0;
  }
  return t / (t + f);
};

//Given an object with 5 ratins, returns the relative percentages e.g.
//{1,2,3,4,5} => 5 is the max, so 5 == 100 => {20, 40, 60, 80, 100}
export const ratingPercentages = (ratings) => {
  let max = 0;
  let out = [];
  [5, 4, 3, 2, 1].forEach((x) => {
    let val = ratings[x] ? parseInt(ratings[x]) : 0;
    max = val > max ? val : max;
    out.push(val);
  });
  if (max === 0) {
    return out;
  }
  return out.map((x) => Math.floor((100 * x) / max));
};

//Sum up a ratings object and return the total rating
export const totalRating = (ratings) => {
  if (!ratings) {
    return 0;
  }
  let total = 0;
  let count = 0;
  [5, 4, 3, 2, 1].forEach((x) => {
    let val = ratings[x] ? parseInt(ratings[x]) : 0;
    count += val;
    total += val * x;
  });
  if (count === 0) {
    return 0;
  }
  return Math.floor((4 * total) / count) / 4;
};

export const allTrue = { 1: true, 2: true, 3: true, 4: true, 5: true };
export const allFalse = { 1: false, 2: false, 3: false, 4: false, 5: false };

//Returns a new filter object based upon the current filters and what was clicked
// all true ==> any new click will result in 4 falses and 1 true for the clicked value
// {t,t,t,t,t} => click on 5 => {f,f,f,f,t}
// click turns everything false
// {f,f,f,f,t} => click on 5 => {t,t,t,t,t}
// all others
// {f,f,t,t,f} => click on 1 => {t,f,t,t,f}
export const getNewFilters = (currentObj, clicked) => {
  if (clicked === -1) {
    return { ...allTrue };
  }
  let temp = { ...currentObj };
  //if showing all filters, then click should flip everything else to false
  if (!Object.values(temp).includes(false)) {
    temp = { ...allFalse };
  }
  //invert the current star
  temp[clicked] = !temp[clicked];
  //if nothing selected, then everything should be selected
  if (!Object.values(temp).includes(true)) {
    temp = { ...allTrue };
  }
  return temp;
};

// Returns a string that says which filters are selected
export const filtersToText = (currentObj) => {
  //all filters are true
  if (!Object.values(currentObj).includes(false)) {
    return null;
  } else {
    let temp = [5, 4, 3, 2, 1].filter((x) => currentObj[x]);
    return 'showing: ' + temp.join(', ');
  }
};
