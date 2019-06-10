export class Imagen{
    constructor(){}

    convertirImagen(img): File
    {
        var arr = img.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], "img.jpg", {type:mime});
        return file;
    }

    convertirImagenEnBlob(img): any
    {
        let arr = img.split(',');
        let bstr = window.atob(arr[1]);
        let arrayBuffer = new ArrayBuffer(bstr.length);
        let int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < bstr.length; i++) {
        int8Array[i] = bstr.charCodeAt(i);
        }
        let blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    }
}