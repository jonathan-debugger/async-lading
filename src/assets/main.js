/*Urls de la apis*/
const apiYoutube = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCLVz1B001PIbq9LliJenV2w&part=snippet%2Cid&order=date&maxResults=10';
const apiInstagram = 'https://graph.instagram.com/me/media?fields=id,media_url,media_type,caption&limit=4&access_token=IGQVJVTnpvMG1Cb3ZAuRmFpaDFyd25BQ3hhNnY3SE8tSzhsY1NsZA2hfUEg4R2w1OWdPTVg3TEV3ZATJmVDNYTTdfQjdsVWRDQnFCdVZAraHlzUTJCcG5KTjVhVWs4UUxTQ2pJMDl4RUphd3F3V0ZAVaFQxSQZDZD';

/*Elemento donde vamos a insertar los videos en el dom*/
const youtube = null || document.getElementById('youtube');
const instagram = null || document.getElementById('instagram');
/*Opciones para hacer la peticion a la api*/
const optionsY = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '589963e22fmshf3dc928c0101ed9p1e182ejsne4bfa54016f9', // key unica no se debe compartir con nadie
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
    /*Obtenemos los datos de la api*/
async function fetchData(urlApi){
    const response = await fetch(urlApi, optionsY)
    const data = response.json();
    return data;
}

//Generamos la interfaz de las ultimas publicaciones de youtube
interfaceYoutube(); 
async function interfaceYoutube(){
    try{
        const videos = await fetchData(apiYoutube);
        
        let view = `
            ${videos.items.map(video => `
                <a target="_blank" href="https://www.youtube.com/watch?v=${video.id.videoId}">
                    <div class="group relative">
                        <div class="relative w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                            <i class="text-xl fa-solid fa-play absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white	 "></i>
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
            youtube.innerHTML = view;
        //Limitamos la cantidad de elementos del array 0 a 4 y (los unimos con join como una cadena)
    }catch(error){
        console.log(error);
    }
}

/*Instagram api*/
//Generamos los ultimos post de las cuentas de instagram
async function getDataInstagram(urlApi){
    const response = await fetch(urlApi);
    const data = response.json();
    return data;
}

//Agregamos los datos al dom
interfaceInstagram();
async function interfaceInstagram(){
    try {
        const data = await getDataInstagram(apiInstagram);
        const items = data.data;
            
        let view = items.map(item=>{
            if(item.media_type=='VIDEO'){ 
                 return `
                    <div class="group relative">
                        <div class=""> 
                            <video width="400" controls>
                                <source src="${item.media_url}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                    ${item.caption}
                            </h3>
                    </div>
                            `;
                            
            }else if(item.media_type='IMAGE'){
                 return ` <div class="group relative">
                            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                <img src="${item.media_url}"  class="w-full">
                            </div>
                            <div class="mt-4 flex justify-between">
                                <h3 class="text-sm text-gray-700">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    ${item.caption}
                                </h3>
                            </div>
                        </div> `;
            }
           
        }).join('');//uno todas las posiciones del array en un string

     instagram.innerHTML=view;
    } catch (error) {
        console.log(error);
    }
}

