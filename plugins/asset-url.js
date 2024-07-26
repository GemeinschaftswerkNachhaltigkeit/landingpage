const url = (id, config) => {
  if (!id) return null;
  return `${config.public.assetUrl}/assets/${id}`;
};

const imageUrl =
  (config) =>
  (id, { width, height, format, quality }) => {
    const assetUrl = url(id, config);

    const params =
      '' +
      (height || width ? 'fit=cover' : '') +
      (height ? `&height=${height}` : '') +
      (width ? `&width=${width}` : '') +
      (format ? `&format=${format}` : '') +
      (quality ? `&quality=${quality}` : '');

    return `${assetUrl}?${params}`;
  };

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  return {
    provide: {
      assetURL: (id) => {
        return url(id, config);
      },
      imageURL: imageUrl(config),
      getBgImgSectionStyle: (imgId) => {
        const portraitOptions = { width: 1080, height: 1920 };

        const imgUrlFn = imageUrl(config);

        return (
          "--bg-landscape: url('" +
          imgUrlFn(imgId, { format: 'webp' }) +
          "'); " +
          "--bg-portrait: url('" +
          imgUrlFn(imgId, { ...portraitOptions, format: 'webp' }) +
          "'); "
        );
      },
    },
  };
});
