import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';

const parseDurationToSeconds = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);
  return hours * 3600 + minutes * 60 + seconds;
};

const decodeHTMLEntities = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const VideoSection = () => {
  const [mainVideo, setMainVideo] = useState(null);
  const [sideVideos, setSideVideos] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/youtube/videos');
        const data = await res.json();

        const { videos, details } = data;

        if (!videos || !details || !Array.isArray(details)) {
          console.error('Invalid response from backend:', data);
          return;
        }

        const durations = details.reduce((acc, item) => {
          const id = item.id;
          const duration = item.contentDetails.duration;
          acc[id] = parseDurationToSeconds(duration);
          return acc;
        }, {});

        const longVideos = videos.filter(
          (item) => durations[item.id.videoId] > 120
        );
        const shortVideos = videos.filter(
          (item) => durations[item.id.videoId] <= 120
        );

        const main = longVideos[0];
        const side = [...longVideos.slice(1), ...shortVideos].slice(0, 3);

        setMainVideo(main);
        setSideVideos(side);
        setSelectedVideoId(main?.id.videoId);
      } catch (err) {
        console.error('Error fetching videos from backend:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      {isModalOpen && selectedVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-black border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl aspect-video p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-yellow-400"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
              title="YouTube Video"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-black/70 text-yellow-300 px-3 py-1 rounded uppercase font-bold text-sm tracking-wider shadow">
              {mainVideo?.snippet?.title || 'Latest Video'}
            </div>
          </div>
        </div>
      )}

      <section className="max-w-6xl mx-auto bg-black text-white border border-white/20 shadow-inner rounded-xl p-4 sm:p-6 flex flex-row gap-4 items-stretch">
        {/* Left Sidebar */}
        <div className="flex flex-col justify-end items-center p-2 sm:p-4 bg-black border border-white/20 rounded-lg w-[40px] sm:w-[60px]">
          <div className="flex flex-col space-y-6 text-white text-sm sm:text-lg mb-4">
            {/* SVG 1 */}
            <div className="cursor-pointer">
              <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.81092 21.5625H6.00775C6.21163 21.5625 6.38202 21.6315 6.51889 21.7695C6.65577 21.9075 6.72469 22.0786 6.72565 22.2827C6.72661 22.4868 6.65769 22.6574 6.51889 22.7944C6.3801 22.9315 6.20972 23 6.00775 23H1.53525C1.20693 23 0.931259 22.8888 0.708232 22.6665C0.485206 22.4442 0.374171 22.1682 0.375128 21.8385V17.3607C0.375128 17.1566 0.444046 16.986 0.581883 16.8489C0.719719 16.7119 0.890578 16.6429 1.09446 16.6419C1.29834 16.641 1.46873 16.71 1.6056 16.8489C1.74248 16.9879 1.81092 17.1585 1.81092 17.3607V21.5625ZM21.9408 21.5625V17.3607C21.9408 17.1566 22.0092 16.986 22.1461 16.8489C22.2839 16.7109 22.4548 16.6419 22.6587 16.6419C22.8625 16.6419 23.0329 16.7109 23.1698 16.8489C23.3067 16.9869 23.3751 17.1575 23.3751 17.3607V21.8385C23.3751 22.1682 23.2641 22.4442 23.042 22.6665C22.82 22.8888 22.5448 23 22.2164 23H17.7425C17.5396 23 17.3692 22.931 17.2314 22.793C17.0935 22.655 17.0246 22.4839 17.0246 22.2798C17.0246 22.0757 17.0935 21.9051 17.2314 21.7681C17.3692 21.631 17.5396 21.5625 17.7425 21.5625H21.9408ZM1.81092 1.43751V5.63932C1.81092 5.84344 1.742 6.01403 1.60417 6.15107C1.46633 6.28811 1.29547 6.35711 1.09159 6.35807C0.887707 6.35903 0.717326 6.29003 0.580447 6.15107C0.443568 6.01211 0.375128 5.84153 0.375128 5.63932V1.16151C0.375128 0.832798 0.486163 0.556798 0.708232 0.333506C0.930302 0.110214 1.20597 -0.00095219 1.53525 6.14317e-06H6.00775C6.21163 6.14317e-06 6.38202 0.0690062 6.51889 0.207006C6.65577 0.345006 6.72469 0.516068 6.72565 0.720193C6.72661 0.924318 6.65769 1.0949 6.51889 1.23194C6.3801 1.36898 6.20972 1.43751 6.00775 1.43751H1.81092ZM21.9408 1.43751H17.7425C17.5396 1.43751 17.3692 1.36851 17.2314 1.23051C17.0935 1.09251 17.0246 0.921444 17.0246 0.717319C17.0246 0.513194 17.0935 0.34261 17.2314 0.205569C17.3692 0.0685271 17.5396 6.14317e-06 17.7425 6.14317e-06H22.2164C22.5448 6.14317e-06 22.82 0.111173 23.042 0.333506C23.2641 0.555839 23.3751 0.831839 23.3751 1.16151V5.63932C23.3751 5.84344 23.3062 6.01403 23.1684 6.15107C23.0305 6.28811 22.8601 6.35711 22.6572 6.35807C22.4543 6.35903 22.2839 6.29003 22.1461 6.15107C22.0082 6.01211 21.9393 5.84153 21.9393 5.63932L21.9408 1.43751Z" fill="#D1D1D1"/>
</svg>
            </div>

            {/* SVG 2 */}
            <div className="cursor-pointer">
              <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 0.999956C9.44891 0.999956 9.63968 1.07897 9.78033 1.21963C9.92098 1.36028 10 1.55104 10 1.74996C10 1.94887 9.92098 2.13963 9.78033 2.28029C9.63968 2.42094 9.44891 2.49996 9.25 2.49996H4.25C3.52065 2.49996 2.82118 2.78969 2.30546 3.30541C1.78973 3.82114 1.5 4.52061 1.5 5.24996V18.75C1.5 19.4793 1.78973 20.1788 2.30546 20.6945C2.82118 21.2102 3.52065 21.5 4.25 21.5H17.75C18.4793 21.5 19.1788 21.2102 19.6945 20.6945C20.2103 20.1788 20.5 19.4793 20.5 18.75V13.75C20.5 13.551 20.579 13.3603 20.7197 13.2196C20.8603 13.079 21.0511 13 21.25 13C21.4489 13 21.6397 13.079 21.7803 13.2196C21.921 13.3603 22 13.551 22 13.75V18.75C22 19.8771 21.5522 20.9581 20.7552 21.7552C19.9582 22.5522 18.8772 23 17.75 23H4.25C3.12283 23 2.04183 22.5522 1.2448 21.7552C0.447767 20.9581 0 19.8771 0 18.75V5.24996C0 4.12279 0.447767 3.04178 1.2448 2.24475C2.04183 1.44772 3.12283 0.999956 4.25 0.999956H9.25ZM14.429 0.0719559C14.5574 0.0112758 14.7003 -0.0117274 14.8412 0.00562065C14.9821 0.0229687 15.1152 0.0799555 15.225 0.169956L23.475 6.91996C23.5576 6.98753 23.6249 7.07196 23.6723 7.16762C23.7197 7.26327 23.7461 7.36794 23.7498 7.47462C23.7535 7.58131 23.7344 7.68755 23.6937 7.78625C23.653 7.88495 23.5918 7.97383 23.514 8.04696L15.264 15.797C15.1573 15.8973 15.0236 15.9643 14.8793 15.9895C14.7351 16.0148 14.5866 15.9973 14.4521 15.9391C14.3177 15.8809 14.2033 15.7847 14.1229 15.6622C14.0426 15.5397 13.9998 15.3964 14 15.25V11.51C12.834 11.546 11.537 11.699 10.146 12.312C8.562 13.01 6.796 14.333 4.986 16.889L4.624 17.416C4.53471 17.5499 4.4047 17.6515 4.25319 17.7058C4.10169 17.7602 3.93672 17.7643 3.78267 17.7177C3.62862 17.6711 3.49366 17.5761 3.39774 17.4468C3.30181 17.3176 3.25002 17.1609 3.25 17C3.25 12.594 4.59 9.43996 6.76 7.39196C8.738 5.52696 11.325 4.65596 14 4.51996V0.749956C13.9998 0.60775 14.04 0.468411 14.1159 0.34819C14.1919 0.227969 14.3005 0.13282 14.429 0.0719559Z" fill="#D1D1D1"/>
</svg>
            </div>

            {/* SVG 3 */}
            <div className="cursor-pointer">
              <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8751 21L10.2076 19.4894C4.28512 14.145 0.375122 10.6087 0.375122 6.29428C0.375122 2.75804 3.15812 0 6.70012 0C8.70112 0 10.6216 0.926975 11.8751 2.38038C13.1286 0.926975 15.0491 0 17.0501 0C20.5921 0 23.3751 2.75804 23.3751 6.29428C23.3751 10.6087 19.4651 14.145 13.5426 19.4894L11.8751 21Z" fill="#D1D1D1"/>
</svg>
            </div>
          </div>
          {/* <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full border border-gray-600" /> */}
        </div>

        {/* Main Video */}
        <div
          className="flex-1 relative aspect-video border border-white/10 rounded-md overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {mainVideo ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${mainVideo.id.videoId}/maxresdefault.jpg`}
                alt="Latest Video"
                className="w-full h-full object-cover transition duration-300"
              />
              {hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <PlayCircle size={64} className="text-white opacity-90" />
                </div>
              )}
              <div className="absolute top-3 left-3 text-xs sm:text-sm font-semibold uppercase tracking-wide bg-black/60 px-2 py-1 rounded">
                {decodeHTMLEntities(mainVideo.snippet.title)}
              </div>
              <div className="absolute top-3 right-3 bg-green-700 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
                New
              </div>
            </>
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>

        {/* Right Thumbnails */}
        <div className="flex flex-col space-y-[10px] w-[100px] sm:w-[130px] md:w-[160px] p-2 border border-white/10 rounded-lg bg-black/60">
          {sideVideos.map((video) => (
            <div
              key={video.id.videoId}
              className="space-y-1 text-center cursor-pointer"
              onClick={() => {
                setSelectedVideoId(video.id.videoId);
                setIsModalOpen(true);
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`}
                alt={video.snippet.title}
                className="w-full h-[60px] sm:h-[80px] object-cover rounded-md"
              />
              <p className="text-[10px] sm:text-xs text-gray-300 font-medium line-clamp-2">
                {decodeHTMLEntities(video.snippet.title)}
              </p>
              <hr className="border-white/20" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VideoSection;
