export const YouTubeVideoModal = ({ videoId, title }:{videoId:string, title:string}) => {
    if (!videoId) return null;
    
    return (
      <div className="w-full h-full">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title={title}
          />
        </div>
      </div>
    );
  };