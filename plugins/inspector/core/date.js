const funcs = {
  factory(date) {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      seconds: date.getSeconds()
    };
  }
};

export default funcs;
