import Rx from "rxjs";
import data from "../core/date";

const clockSource = Rx.Observable
  .timer(1000)
  .map(() => new Date())
  .map(data.factory);

export default clockSource;
