function randomBackground() {

  let colors = [
    "#ff7675", // red
    "#74b9ff", // blue
    "#a29bfe", // purple
    "#20bf6b", // green
    "#fab1a0", // orange
    "#fd79a8", // pink
    "#4b7bec", // dark blue
    "#7158e2", // dark purple
    "#ffeaa7", // yellow
    "#81ecec", // cyan
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
