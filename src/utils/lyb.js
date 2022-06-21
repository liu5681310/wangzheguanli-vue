/* 功能 */
//随机数
export function $random(min, max, num = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
}

//小数百分比互转
export function $potEoPct(str, ret = 4) {
  if (typeof str == "string") {
    return str.replace("%", "") / 100;
  } else {
    return Number((str * 100).toFixed(ret));
  }
}

//全局替换指定字符串
export function $repStr(str, match, rep = "") {
  return str.replace(new RegExp(match, "g"), rep);
}

// 时间格式化
export function $fmtTime(date, fmt = "YYYY-MM-DD hh:mm:ss") {
  date = new Date(date);
  let ret,
    week = ["日", "一", "二", "三", "四", "五", "六"];
  const opt = {
    "Y+": date.getFullYear().toString(),
    "M+": (date.getMonth() + 1).toString(),
    "D+": date.getDate().toString(),
    "h+": date.getHours().toString(),
    "m+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString(),
    w: week[date.getDay()],
    n: new Date(date).valueOf(),
  };
  for (let k in opt) {
    ret = new RegExp(`(${k})`).exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"),
      );
    }
  }
  return fmt;
}

//根据时间段问候
export function $timeGreet(greet = {}) {
  const {
    a = "午夜好",
    b = "早上好",
    c = "上午好",
    d = "中午好",
    e = "下午好",
    f = "晚上好",
  } = greet;
  const now = new Date().getHours();
  return now < 4
    ? a
    : now < 10
    ? b
    : now < 12
    ? c
    : now < 14
    ? d
    : now < 18
    ? e
    : f;
}

//记录已过去时间或倒计时
export function $getCountTime(time = "2022-04-01 10:45:00") {
  let now = new Date(time).getTime(),
    future = new Date().getTime(),
    times =
      future - now > 0
        ? Math.floor((future - now) / 1000)
        : Math.floor((now - future) / 1000);
  const time_arr = [
    { y: times / 60 / 60 / 24 / 30 / 12 },
    { mon: (times / 60 / 60 / 24 / 30) % 12 },
    { d: (times / 60 / 60 / 24) % 30 },
    { h: (times / 60 / 60) % 24 },
    { min: (times / 60) % 60 },
    { s: times % 60 },
  ];
  let timeObj = {};
  time_arr.forEach((item) => {
    const arr = Object.entries(item)[0];
    const key = arr[0];
    const value = arr[1];
    item[key] = Math.floor(value).toString().padStart(2, "0");
    Object.assign(timeObj, item);
  });
  return timeObj;
}

// requestAnimationFrame计时器
export function $frameInterval(fn, fre = 0) {
  let time = 0;
  f();
  function f() {
    time += 10;
    if (time > fre) {
      fn();
      time = 0;
    }
    requestAnimationFrame(f);
  }
}
// 判断是否为数组
export function $isArray(type) {
  return Object.prototype.toString.call(type) === "[object Array]";
}
