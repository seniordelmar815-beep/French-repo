const provider = {
    id: 'flemmix',
    name: 'Flemmix',
    rank: 1,

    async search(query) {
        const searchUrl = `https://flemmix.surf/api/v1/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        return data.results.map(item => ({
            id: item.id,
            title: item.title,
            year: item.year,
            type: item.type === 'movie' ? 'movie' : 'series'
        }));
    },

    async getSources(id) {
        const videoUrl = `https://flemmix.surf/api/v1/watch/${id}`;
        const response = await fetch(videoUrl);
        const data = await response.json();
        
        return data.sources.map(source => ({
            url: source.file,
            quality: source.label,
            type: 'hls'
        }));
    }
};

export default provider;
