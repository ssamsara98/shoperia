const imgHelper = (
  data = {
    filepath: '',
    filename: '',
    type: 'shoperia',
  },
  size = '200-square',
) => {
  if (data.type === 'tokopedia') {
    return `https://images.tokopedia.net/img/cache/${size}/${data.filepath}/${data.filename}`;
  }
  return `https://detteksie-mybucket.s3.amazonaws.com/timg/${size}/${data.filepath}/${data.filename}`;
};

export default imgHelper;
