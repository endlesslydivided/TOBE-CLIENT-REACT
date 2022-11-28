
export function getImages(data:any) 
{
    const formats = ['jpeg', 'gif', 'png', 'apng','jpg', 'svg', 'bmp','ico'];
    return data.filter((x:any) => formats.some((f) => x.path.endsWith(f)));
}

export function getVideos(data:any) 
{
    const formats = ['mp4', 'webm', 'avi', 'wmv'];
    return data.filter((x:any) => formats.some((f) => x.path.endsWith(f)));
}
  
export function getAudios(data:any) 
{
    const formats = ['mp3'];
    return data.filter((x:any) => formats.some((f) => x.path.endsWith(f)));
}