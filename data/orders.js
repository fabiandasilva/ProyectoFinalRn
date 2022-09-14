export const ORDERS = [
  {
    id: "1",
    date: Date.now(),
    total: 7800,
    items: [
      {
        id: 1,
        category: 1,
        name: "Pan Baquette",
        description: "Clasico pan frances",
        weight: "350gr",
        price: 1600,
      },
      {
        id: 2,
        category: 1,
        name: "Pan ciabatta blanco",
        description:
          "Pan de alta hidratacion, miga alveolada y corteza crujiente",
        weight: "800gr",
        price: 3000,
      },
    ],
  },
  {
    id: 2,
    date: Date.now(),
    total: 6600,
    items: [
        {
            id: 4,
            category: 2,
            name:'Pan de Molde Integral de Centeno',
            description:'Pidelo enterootajado,conosin semillas',
            weight:'900gr',
            price:3300,
        }
    ]
  }
];
