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
    title: 'How to Properly Recycle Plastic',
    description: 'Learn which plastics can be recycled and how to prepare them correctly.',
    category: 'Plastic',
    image: '/placeholder.svg',
    content: 'Rinse containers, remove labels when possible, and check the recycling number. Types 1, 2, and 5 are most commonly accepted.',
  },
  {
    id: '2',
    title: 'Paper Recycling Best Practices',
    description: 'Maximize your paper recycling impact with these simple tips.',
    category: 'Paper',
    image: '/placeholder.svg',
    content: 'Keep paper dry, remove plastic windows from envelopes, and avoid recycling paper with food contamination.',
  },
  {
    id: '3',
    title: 'Glass Recycling Guide',
    description: 'Everything you need to know about recycling glass bottles and jars.',
    category: 'Glass',
    image: '/placeholder.svg',
    content: 'Remove lids and caps, rinse thoroughly, and separate by color if required by your local facility.',
  },
  {
    id: '4',
    title: 'Metal Can Recycling',
    description: 'From aluminum to steel, learn how to recycle metal containers.',
    category: 'Metal',
    image: '/placeholder.svg',
    content: 'Aluminum cans can be recycled infinitely. Crush cans to save space, and rinse before recycling.',
  },
  {
    id: '5',
    title: 'Cardboard Preparation Tips',
    description: 'Prepare your cardboard properly for maximum recycling efficiency.',
    category: 'Paper',
    image: '/placeholder.svg',
    content: 'Flatten boxes, remove tape and labels, and keep cardboard dry to ensure it can be recycled.',
  },
  {
    id: '6',
    title: 'What Cannot Be Recycled',
    description: 'Common items that people mistakenly put in recycling bins.',
    category: 'General',
    image: '/placeholder.svg',
    content: 'Plastic bags, styrofoam, pizza boxes with grease, and broken glass should not go in regular recycling.',
  },
  {
    id: '7',
    title: 'Electronics Recycling',
    description: 'How to responsibly dispose of old electronics and batteries.',
    category: 'Electronics',
    image: '/placeholder.svg',
    content: 'Take electronics to designated e-waste collection points. Never throw batteries in regular trash.',
  },
  {
    id: '8',
    title: 'Composting Organic Waste',
    description: 'Turn your food scraps into valuable compost for gardens.',
    category: 'Organic',
    image: '/placeholder.svg',
    content: 'Fruit peels, vegetable scraps, coffee grounds, and eggshells make great compost. Avoid meat and dairy.',
  },
];
