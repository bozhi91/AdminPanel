/**
 * Created by bozhi on 7/10/16.
 */
module.exports = (target, source) => {
  for (let p in source) {
    if (source.hasOwnProperty(p) && p != null) {
      target[p] = source[p]
    }
  }
}
