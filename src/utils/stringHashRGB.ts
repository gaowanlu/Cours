/**
 * 将字符串hash为number
 * @param str 
 * @returns 
 */
function strHash(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
/**
 * 将字符串hash为RGB
 * @param str:string 要进行hash的字符串
 * @returns [r:number,g:number,b:numebr]
 */
export default function stringHashRGB(str) {
    let v = {hash:0};
    v.hash = strHash(str);
    return [
        (v.hash & 0xff0000) >> 16,
        (v.hash & 0x00ff00) >> 8,
        v.hash & 0x0000ff
    ];
}