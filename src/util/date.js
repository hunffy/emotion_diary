export const getStringDate = (e) => {
  //toISOString()으로 받아온 객체 : YYYY-MM-DDTHH:mm:ss.ssz형태로 나오는데 그걸 slice로 0~9까지만 return 즉 년,월,일까지만 return해준다.
  return e.toISOString().slice(0, 10);
};
