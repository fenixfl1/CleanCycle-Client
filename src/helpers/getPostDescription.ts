import { truncateText } from './truncateText';

export const getPostDescription = (content: string) => {
  const description = content.replace(/<img[^>]*>/g, '');
  const regex = /<h[1-6]>(.*?)<\/h[1-6]>/g;
  return truncateText(description.replace(regex, ''), 450);
};
