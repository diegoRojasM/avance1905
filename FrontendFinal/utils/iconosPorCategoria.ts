// export const obtenerIconoPorCategoria = (categoria: string) => {
//   switch (categoria.toLowerCase()) {
//     case 'académicos':
//       return require('../img/icons/IconAcademico.png');
//     case 'gastronómicos':
//       return require('../img/icons/IconGastronomico.png');
//     case 'monumentos':
//       return require('../img/icons/IconMonumento.png');
//     case 'religiosos':
//       return require('../img/icons/IconIglesia.png');
//     case 'históricos':
//       return require('../img/icons/IconMuseo.png');
//     case 'plaza y parques':
//       return require('../img/icons/IconParque.png');
//     case 'turísticos':
//       return require('../img/icons/IconTuristico.png');
//     default:
//   }
// };

export function obtenerIconoPorCategoria(categoria: string): any {
  switch (categoria.toLowerCase()) {
    case 'académicos':
    case 'academicos':
      return require('../app/img/icons/IconAcademico.png');

    case 'gastronómicos':
    case 'gastronomicos':
      return require('../app/img/icons/IconGastronomico.png');

    case 'monumentos':
      return require('../app/img/icons/IconMonumento.png');

    case 'religiosos':
      return require('../app/img/icons/IconIglesia.png');

    case 'históricos':
    case 'historicos':
      return require('../app/img/icons/IconMuseo.png');

    case 'plaza y parques':
    case 'parques':
      return require('../app/img/icons/IconParque.png');

    case 'turísticos':
    case 'turisticos':
      return require('../app/img/icons/IconTuristico.png');
  }
}

