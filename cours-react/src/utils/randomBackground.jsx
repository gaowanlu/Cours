function randomBackground() {
  let colors = [
    "linear-gradient(to top, #f77981 0%, #6f61d8 100%)", // red
    "linear-gradient(to top, #f16286 0%, #ffb199 100%)",
    "linear-gradient(-20deg, #d37afc 0%, #50a2b4 100%)",
    "linear-gradient(-20deg, #ee71e1 0%, #3fb68a 100%)",
    "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
    "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
    "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)",
    "linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)",
    // "#6fb1f3", // blue
    // "#9993f0", // purple
    // "#2fbd71", // green
    // "#eea493", // orange
    // "#ec729d", // pink
    // "#4a78e4", // dark blue
    // "#7057dd", // dark purple
    // "#e9d594", // yellow
    // "#84e2e2", // cyan
  ];
  let idx = 0;
  let courseColorMap = new Map();
  return (courseName) => {
    if (courseColorMap.has(courseName)) {
      return courseColorMap.get(courseName);
    } else {
      idx = (idx + 1) % colors.length;
      courseColorMap.set(courseName, colors[idx]);
      return colors[idx];
    }
  };
}
export default randomBackground;
