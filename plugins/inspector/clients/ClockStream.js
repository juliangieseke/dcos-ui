import Rx from "rxjs";

const timeSubject = new Rx.Subject();

// SECOND_TICK
Rx.Observable.interval(1000).subscribe(() => {
  timeSubject.next({
    second: new Date().getSeconds()
  });
});

// FULL_TIME_TICK every 10 seconds
Rx.Observable.interval(1000 * 10).subscribe(() => {
  const now = new Date();
  timeSubject.next({
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),
    ts: now.getTime()
  });
});

export default timeSubject;
