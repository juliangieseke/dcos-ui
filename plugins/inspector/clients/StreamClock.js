import Rx from "rxjs";

const clockSource = Rx.Observable
  .interval(1000)
  .map(() => new Date().toISOString())
  .publishReplay(5)
  .refCount();

export default clockSource;
