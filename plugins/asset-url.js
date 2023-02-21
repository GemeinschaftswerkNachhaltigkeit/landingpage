export default ({ $config, $directus }, inject) => {
  inject("assetURL", function(id) {
    if (!id) return null;
    return `${$config.assetUrl}/assets/${id}`;
  });

  inject("imageURL", function(id, {width, height, format, quality}) {
    const assetUrl = this.$assetURL(id);

    const params = ''
      + ( (height || width) ? 'fit=cover': '')
      + (height ? `&height=${height}`: '')
      + (width ? `&width=${width}`: '')
      + (format ? `&format=${format}`: '')
      + (quality ? `&quality=${quality}`: '');

    return `${assetUrl}?${params}`;
  });

  inject("getBgImgSectionStyle", function(imgId) {
    const portraitOptions = {width:1080, height:1920};

    return '--bg-landscape: url(\''+ this.$imageURL(imgId,{format:'webp'})+'\'); '
          + '--bg-portrait: url(\''+ this.$imageURL(imgId,{...portraitOptions, format:'webp'})+'\'); '
          + '--bg-landscape-png: url(\''+ this.$imageURL(imgId,{format:'png'})+'\'); '
          + '--bg-portrait-png: url(\''+ this.$imageURL(imgId,{...portraitOptions, format:'png'})+'\'); '
  });

};
