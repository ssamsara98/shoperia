const imgHelper = (
  data = {
    filepath: '',
    filename: '',
    type: 'shoperia',
  },
  size = '300-square',
) => {
  if (data.type === 'tokopedia') {
    return `https://images.tokopedia.net/img/cache/${size}/${data.filepath}/${data.filename}`;
  }
  const result = `https://${process.env.REACT_APP_AWS_BUCKET}.s3.amazonaws.com/timg/${size}/${data.filepath}/${data.filename}.webp`;
  return result;
};

export default imgHelper;
