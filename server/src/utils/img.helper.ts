const imgHelper = (
  data = {
    filepath: '',
    filename: '',
    type: 'shoperia',
  },
  size = '100-square',
) => {
  if (data.type === 'tokopedia') {
    return `https://images.tokopedia.net/img/cache/${size}/${data.filepath}/${data.filename}`;
  }
  return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/timg/${size}/${data.filepath}/${data.filename}.webp`;
};

// module.exports = imgHelper;
export default imgHelper;
