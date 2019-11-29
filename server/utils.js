const createPoll = (fn, interval) => {
  const subscribers = {};
  const intervals = {};
  return ({ getKey, args, onSuccess }) => {
    const key = getKey();
    if (!subscribers[key]) {
      subscribers[key] = [];
    }
    const index = subscribers[key].push(onSuccess) - 1;
    if (!intervals[key]) {
      intervals[key] = setInterval(() => {
        if (subscribers[key].length < 1) {
          clearInterval(intervals[key]);
          intervals[key] = null;
        }
        fn(...args).then((...args) =>
          subscribers[key].forEach(s => s(...args))
        );
      }, interval);
    }
    return () => {
      subscribers[key].splice(index, 1);
    };
  };
};

module.exports = { createPoll };
