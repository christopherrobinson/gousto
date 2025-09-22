import { type APIRoute } from 'astro';
import favicon from '@/images/favicon.png';

const faviconPngSizes = [144, 512];

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        height: size,
        format: 'png',
        src: favicon,
        width: size,
      })

      return {
        sizes: `${image.options.width}x${image.options.height}`,
        src: image.src,
        type: `image/${image.options.format}`,
      }
    })
  );

  const manifest = {
    display: 'standalone',
    id: 'gousto.wiki',
    icons: icons,
    name: site.name,
    start_url: '/',
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Cache-Control': 'public, max-age=604800, s-maxage=604800',
      'Content-Type': 'application/json',
    },
  });
}
