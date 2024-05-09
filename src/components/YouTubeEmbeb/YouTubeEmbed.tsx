interface Props {
  videoId: string;
}

function YouTubeEmbed({ videoId }: Props) {
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width='480'
      height='315'
      src={src}
      title='YouTube video player'
      frameBorder='1'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  );
}

export default YouTubeEmbed;
