function randomBackground() {
  let colors = [
    "#f37070", // red
    "#6fb1f3", // blue
    "#9993f0", // purple
    "#2fbd71", // green
    "#eea493", // orange
    "#ec729d", // pink
    "#4a78e4", // dark blue
    "#7057dd", // dark purple
    "#e9d594", // yellow
    "#84e2e2", // cyan
  ];
  let idx = 0;
  let courseColorMap = new Map();
  return (courseName) => {
    if (courseColorMap.has(courseName)) {
      return courseColorMap.get(courseName)
    } else {
      idx = (idx + 1) % colors.length;
      courseColorMap.set(courseName, colors[idx]);
      return colors[idx];
    }
  };
}
export default randomBackground;
