function randomBackground() {
  let colors = [
    "#ffc1b1",
    "#f8b57e",
    "#b9f87e",
    "#7ee6f8",
    "#7e86f8",
    "#f87eee",
    "#f8dc7e",
    "#7ef8c5",
    "#7e9bf8",
    "#b5f87e",
  ];
  let color1 = parseInt(Math.random() * 10) % (colors.length - 1);
  let color2 = parseInt(Math.random() * 10) % (colors.length - 1);
  if (color1 === color2) {
    color2 = (color2 + 1) % (colors.length - 1); //color next
  }
  let result = [colors[color1], colors[color2]];
  return result;
}
export default randomBackground;
