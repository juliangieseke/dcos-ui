import Rx from "rxjs";

const timeSubject = new Rx.Subject();

// SECOND_TICK
Rx.Observable.interval(1000).subscribe(() => {
  timeSubject.next({
    second: new Date().getSeconds(),
    event: "SECOND_TICK"
  });
});

// FULL_TIME_TICK every seconds
Rx.Observable.interval(1000 * 3).subscribe(() => {
  const now = new Date();
  timeSubject.next({
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),

    ts: now.getTime(),
    event: "FULL_TIME_TICK"
  });
});

export default timeSubject;
