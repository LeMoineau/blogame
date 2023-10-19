/**
 * @author Pierre Faber
 */

Array.prototype.add = function(value, callbackSuccess = undefined) {
  if (!this.includes(value)) {
    this.push(value)
    if (callbackSuccess !== undefined) callbackSuccess()
  }
}

Array.prototype.remove = function(value, callbackSuccess = undefined) {
  let index = this.findIndex(v => v === value)
  if (index !== -1) {
    this.splice(index, 1)
    if (callbackSuccess !== undefined) callbackSuccess()
  }
}

function loadImage(img) {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  })
}
