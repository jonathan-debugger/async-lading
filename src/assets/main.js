/*Url de la api*/
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCLVz1B001PIbq9LliJenV2w&part=snippet%2Cid&order=date&maxResults=10';

/*Elemento donde vamos a insertar los videos en el dom*/
const content = null || document.getElementById('content');

/*Opciones para hacer la peticion a la api*/
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '589963e22fmshf3dc928c0101ed9p1e182ejsne4bfa54016f9', // key unica no se debe compartir con nadie
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
/*Obtenemos los datos de la api*/
async function fetchData(urlApi){
    const response = await fetch(urlApi, options)
    const data = response.json();
    return data;
}

(async()=>{
    try{
        const videos = await fetchData(API);
        console.log(videos.items);
        
        let view = `
            ${videos.items.map(video => `
                <a target="_blank" href="https://www.youtube.com/watch?v=${video.id.videoId}">
                    <div class="group relative">
                        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${video.snippet.title}
                            </h3>
                        </div>
                    </div>
                 </a>
            ` ).slice(0,4).join('')}
            `;
            content.innerHTML = view;
        //Limitamos la cantidad de elementos del array 0 a 4 y (los unimos con join como una cadena)
    }catch(error){
        console.log(error);
    }
})();