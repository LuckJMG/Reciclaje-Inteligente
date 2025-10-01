export interface EducationalPost {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  content: string;
}

export const educationalPosts: EducationalPost[] = [
  {
    id: '1',
    title: 'Cómo Reciclar Plástico Correctamente',
    description: 'Aprende qué plásticos se pueden reciclar y cómo prepararlos correctamente.',
    category: 'Plástico',
    image: '/placeholder.svg',
    content: 'Enjuaga los envases, retira las etiquetas cuando sea posible y verifica el número de reciclaje. Los tipos 1, 2 y 5 son los más comúnmente aceptados. Es importante separar las tapas de las botellas ya que pueden ser de diferente tipo de plástico. Los envases de productos de limpieza deben estar completamente vacíos antes de reciclarlos.',
  },
  {
    id: '2',
    title: 'Mejores Prácticas para Reciclar Papel',
    description: 'Maximiza tu impacto en el reciclaje de papel con estos consejos simples.',
    category: 'Papel',
    image: '/placeholder.svg',
    content: 'Mantén el papel seco, retira las ventanas de plástico de los sobres y evita reciclar papel con contaminación de alimentos. El papel triturado debe ir en bolsas transparentes. Los recibos térmicos no son reciclables debido a su recubrimiento químico. Separa el papel blanco del papel de color para un mejor reciclaje.',
  },
  {
    id: '3',
    title: 'Guía para Reciclar Vidrio',
    description: 'Todo lo que necesitas saber sobre el reciclaje de botellas y frascos de vidrio.',
    category: 'Vidrio',
    image: '/placeholder.svg',
    content: 'Retira tapas y tapones, enjuaga bien y separa por color si lo requiere tu centro de reciclaje local. El vidrio se puede reciclar infinitamente sin perder calidad. No mezcles vidrio de ventanas o espejos con vidrio de envases, ya que tienen composiciones diferentes. Los frascos de perfume también son reciclables una vez vacíos.',
  },
  {
    id: '4',
    title: 'Reciclaje de Latas de Metal',
    description: 'Desde aluminio hasta acero, aprende a reciclar contenedores de metal.',
    category: 'Metal',
    image: '/placeholder.svg',
    content: 'Las latas de aluminio se pueden reciclar infinitamente. Aplasta las latas para ahorrar espacio y enjuágalas antes de reciclarlas. Las latas de conserva de acero también son 100% reciclables. No es necesario retirar las etiquetas de papel, ya que se separan durante el proceso de reciclaje. El aluminio reciclado ahorra un 95% de la energía necesaria para producir aluminio nuevo.',
  },
  {
    id: '5',
    title: 'Consejos para Preparar Cartón',
    description: 'Prepara tu cartón correctamente para máxima eficiencia de reciclaje.',
    category: 'Papel',
    image: '/placeholder.svg',
    content: 'Aplana las cajas, retira la cinta adhesiva y las etiquetas, y mantén el cartón seco para asegurar que pueda reciclarse. El cartón mojado o contaminado con grasa no es reciclable. Las cajas de pizza con restos de comida deben ir al compost o basura orgánica. El cartón corrugado es altamente valorado en el reciclaje.',
  },
  {
    id: '6',
    title: 'Qué No Se Puede Reciclar',
    description: 'Artículos comunes que la gente pone erróneamente en los contenedores de reciclaje.',
    category: 'General',
    image: '/placeholder.svg',
    content: 'Las bolsas de plástico, el poliestireno (icopor), las cajas de pizza con grasa y el vidrio roto no deben ir en el reciclaje regular. Los pañales, toallas sanitarias y papel higiénico tampoco son reciclables. Los envases de productos peligrosos deben llevarse a puntos de recolección especiales. Contaminar el reciclaje con estos materiales puede arruinar lotes completos.',
  },
  {
    id: '7',
    title: 'Reciclaje de Electrónicos',
    description: 'Cómo deshacerse responsablemente de electrónicos viejos y baterías.',
    category: 'Electrónica',
    image: '/placeholder.svg',
    content: 'Lleva los electrónicos a puntos de recolección de residuos electrónicos designados. Nunca tires las baterías en la basura regular ya que contienen metales pesados tóxicos. Los teléfonos celulares, computadoras y electrodomésticos contienen materiales valiosos que pueden recuperarse. Algunos fabricantes ofrecen programas de devolución. Borra toda tu información personal antes de reciclar dispositivos.',
  },
  {
    id: '8',
    title: 'Compostaje de Residuos Orgánicos',
    description: 'Convierte tus restos de comida en compost valioso para jardines.',
    category: 'Orgánico',
    image: '/placeholder.svg',
    content: 'Las cáscaras de frutas, restos de verduras, posos de café y cáscaras de huevo hacen un excelente compost. Evita la carne y los lácteos ya que atraen plagas y generan malos olores. También puedes compostar hojas secas, papel sin tinta y aserrín. El compost mejora la calidad del suelo y reduce la necesidad de fertilizantes químicos. Un buen compost tarda de 2 a 6 meses en estar listo.',
  },
];
