/*
 * Create by wangsw on 2019-02-19
 */

const formatDuring = (mss, long) => {
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = parseInt((mss % (1000 * 60)) / 1000),
    showHours = hours < 10 ? "0" + hours : hours,
    showMinutes = minutes < 10 ? "0" + minutes : minutes,
    showSeconds = seconds < 10 ? "0" + seconds : seconds;
  if (hours) {
    return showHours + ":" + showMinutes + ":" + showSeconds;
  } else {
    return (long ? "00:" : "") + showMinutes + ":" + showSeconds;
  }
};

/**
 * 星期 数字返回对应英文
 */
const getShortWeek = week => {
  if (typeof week === "number" && (week >= 0 || week <= 6)) {
    let weekMap = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THUR",
      5: "FRI",
      6: "SAT"
    };
    let shortWeek = weekMap[week];
    return shortWeek;
  }
};

/**
 * 月份 数字返回对应英文
 */
const getShortMonth = month => {
  if (typeof month === "number" && (month >= 0 || month <= 11)) {
    let monthMap = {
      0: "JAN",
      1: "FEB",
      2: "MAR",
      3: "APR",
      4: "MAY",
      5: "JUN",
      6: "JUL",
      7: "AUG",
      8: "SEPT",
      9: "OCT",
      10: "NOV",
      11: "DEC"
    };
    let shortMonth = monthMap[month];
    return shortMonth;
  }
};
/**
 * 获取当前日期
 */
const getDate = timeStamp => {
  let date = new Date();
  if (timeStamp) {
    date = new Date(timeStamp);
  }

  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate();
  d = d < 10 ? "0" + d : d;
  m = m < 10 ? "0" + m : m;
  return y + "-" + m + "-" + d;
};
/**
 * 根据时间戳转换为比赛开始时间 格式为:HH:mm
 */
const formatMatchTime = time => {
  if (
    typeof time !== "number" ||
    (time.toString().length !== 10 && time.toString().length !== 13)
  ) {
    return;
  }
  let formatTime = time;
  if (time.toString().length === 10) {
    formatTime = time * 1000;
  }
  let date = new Date(formatTime),
    hours = date.getHours(),
    minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
};
// 时间戳格式转化为 yyyy-mm-dd hh:mm:ss
const getDateTime = timeStamp => {
  const date = new Date(timeStamp * 1),
    y = date.getFullYear();
  let minute = date.getMinutes(),
    second = date.getSeconds(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};
/**
 * 获取url参数
 */
const getUrlParam = name => {
  const u = window.location.search,
    reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    r = u.substr(u.indexOf("?") + 1).match(reg);
  return r != null ? r[2] : "";
};
// el: document.getElementsByClassName('videos')
// DIV中 topLeft:左上点  rightBottom:右下点
// 返回true 否则返回false
const isElementInViewport = el => {
  let rect = el.getBoundingClientRect(),
    top = rect.top,
    bottom = rect.bottom,
    left = rect.left,
    right = rect.right;
  let viewPortHeight =
      document.documentElement.clientHeight || window.innerHeight,
    viewPortWidth = document.documentElement.clientWidth || window.innerWidth;

  return {
    topLeft:
      top > 0 && top < viewPortHeight && left > 0 && left < viewPortWidth,
    rightBottom:
      bottom > 0 &&
      bottom < viewPortHeight &&
      right > 0 &&
      right < viewPortWidth
  };
};
/**
 * setCookie
 */
const setCookie = (name, value) => {
  var cookieString = name + "=" + value;
  document.cookie = cookieString;
};
const isEmptyStr = data => {
  let showData = data;
  if (data === "" || !data) {
    showData = 0;
  }
  return showData;
};
// match_type 对应  overs total
const matchTypeMapOver = type => {
  let map = {
    ODI: 50,
    T20: 20
  };
  let total = map[type];
  if (!map[type]) {
    total = "";
  }
  return total;
};

export {
  formatDuring,
  getShortWeek,
  getShortMonth,
  getDate,
  formatMatchTime,
  getDateTime,
  getUrlParam,
  isElementInViewport,
  setCookie,
  isEmptyStr,
  matchTypeMapOver
};
