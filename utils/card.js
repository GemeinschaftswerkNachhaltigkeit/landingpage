export function excerpt(html, limit = 140) {
  if (!html) {
    return '';
  }
  const ellipsis = '...';
  const limitedTextLengWithoutEllipses = limit - ellipsis.length;
  const text = stripHtml(html);

  if (text.length < limit) {
    return text;
  } else {
    let subStr = text.substring(0, limitedTextLengWithoutEllipses);
    const lastChar = subStr.charAt(subStr.length - 1);

    if (lastChar !== ' ') {
      subStr = subStr.split(' ').slice(0, -1).join(' ');
    } else {
      if (lastChar === ' ' || lastChar === ',') {
        subStr = subStr.slice(0, -1);
      }
      if (lastChar === ' ' || lastChar === ',') {
        subStr = subStr.slice(0, -1);
      }
    }
    return `${subStr}${ellipsis}`;
  }
}

export function stripHtml(html) {
  const withoutTags = html.replace(/<[^>]*>?/gm, '');
  let withoutSpecialHtmlChars = withoutTags.replace(/&[a-zA-Z]*;?/gm, '');
  withoutSpecialHtmlChars = withoutSpecialHtmlChars.replace(/&nbsp;/g, ' ');
  return withoutSpecialHtmlChars ? withoutSpecialHtmlChars.trim() : '';
}

export function locationString(location, t) {
  if (location?.online) {
    return t('labels.online');
  }
  if (location?.privateLocation) {
    return t('labels.private');
  }
  if (!location || !location.address) {
    return '';
  }
  const city = location?.address?.city || '';
  const state = location?.address?.state || '';
  return state ? `${city}, ${state}` : city;
}

export function dateRangeString(period, lang, t) {
  if (period) {
    if (period.permanent) {
      return t('labels.permanent');
    }
    const start = period?.start;
    const end = period?.end;

    const formattedStart = new Intl.DateTimeFormat(lang).format(
      new Date(start)
    );
    const formattedEnd = new Intl.DateTimeFormat(lang).format(new Date(end));

    if (start === end) {
      return `${formattedStart}`;
    }

    return `${formattedStart} - ${formattedEnd}`;
  }
  return '';
}
