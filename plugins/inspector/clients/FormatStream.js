import Rx from "rxjs";

const formatSubject = new Rx.Subject();

const buildFormat = (name, value) => {
  const now = new Date();

  return {
    format: {
      name,
      value,
      sample: now.toLocaleDateString(value)
    },
    updated: now
  };
};

const post = (name, value) => {
  Rx.Observable.timer(2000).subscribe(() => {
    formatSubject.next(buildFormat(name, value));
  });
};

// toLocaleDateString
post("default", "en-US");

formatSubject.subscribe(console.log.bind(this));

export default { formatPost: post, formatStream: formatSubject };
