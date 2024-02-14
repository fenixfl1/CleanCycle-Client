/**
 * This function extract all images from a post and return an array of images url
 * @param {string} html
 * @returns {string[]}
 */
export function getPostImg(postContent) {
  var regex = /<img[^>]+src="([^">]+)/g;
  var images = new Array<string>();
  var match = regex.exec(postContent);
  while (match != null) {
    images.push(match[1]);
    match = regex.exec(postContent);
  }

  return images;
}
