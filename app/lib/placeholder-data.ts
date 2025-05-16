export type Fruit = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
};

export const fruits: Fruit[] = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
    stock: 100,
    category: "Fresh Fruits",
    imageUrl: "https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz26FKU63vPDd7URpZnEMGKTyfs9NWSYz8teLQ5"
  },
  {
    id: 2,
    name: "Banana",
    price: 0.49,
    stock: 150,
    category: "Fresh Fruits",
    imageUrl: "https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2Wbws9IlHXbc0Dvj1ltMLnxRTS2kUVC9q4pGm"
  },
  {
    id: 3,
    name: "Orange",
    price: 0.79,
    stock: 80,
    category: "Citrus",
    imageUrl: "https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2o85gVPQbntCPcxGhvL38DJ5sAMYpS4mFfRjB"
  },
  {
    id: 4,
    name: "Strawberry",
    price: 2.99,
    stock: 50,
    category: "Berries",
    imageUrl: "https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2s43yq6Y01UfDvR9XyAkFwbgPEx8as5ide27u"
  },
  {
    id: 5,
    name: "Mango",
    price: 1.99,
    stock: 60,
    category: "Tropical Fruits",
    imageUrl: "https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2j1nApx43CReEUsIhVuGHWlZDLzgFYrbyjq4v"
  },
  
];
