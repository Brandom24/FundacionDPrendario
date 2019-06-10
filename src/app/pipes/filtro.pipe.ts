import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any[] {

    const columnas: any[] = columna.split(',');

    if ( texto === '') {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter( item => {
      return item[columnas[0]].toLowerCase().includes(texto.toLowerCase(), texto.toLowerCase()) +
      item[columnas[1]].toLowerCase().includes(texto.toLowerCase(), texto.toLowerCase());
    });
  }

}
