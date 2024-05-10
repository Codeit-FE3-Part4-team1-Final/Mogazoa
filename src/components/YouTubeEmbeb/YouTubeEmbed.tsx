interface Props {
  videoId: string;
}

function YouTubeEmbed({ videoId }: Props) {
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width='100%'
      height='100%'
      src={src}
      title='YouTube video player'
      frameBorder='1'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  );
}

export default YouTubeEmbed;
