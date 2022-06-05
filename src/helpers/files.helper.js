/**
 * Allow or deny mime type files
 * @param {string} value
 * @returns {boolean} return if the value is a image
 */
const allowMimeType = (value) => value.includes('image');

export default allowMimeType;
