export const mockDataCustomer = [
  {
    id: 1,
    name: "TUTOS'ME SAS",
    address: "5 rue de Copenhague",
    zip: "93290",
    town: "Tremblay-en-France",
    phone: "0184606862",
    website: "",
    email: "contact@tutos.pro",
    billed: 700.0,
    paid: 700.0,
    invoices: 1,
    issues: 1,
  },
  {
    id: 2,
    name: "ID Formation",
    address: "113 rue de Lannoy",
    zip: "59000",
    town: "Lille",
    phone: "0320040307",
    mobile: "0631829606",
    website: "https://id-formation.com/",
    email: "Nathalie.Faidherbe@id-formation.fr",
    billed: 17255.0,
    paid: 17255.0,
    invoices: 6,
    issues: 2,
  },
];

export const mockDataPaymentMethod = [
  { id: 1, label: "Virement bancaire" },
  { id: 2, label: "Chèque" },
];

export const mockDataItem = [
  {
    id: 1,
    designation: "Intervention en distanciel (par heure travaillée)",
    price: 50.0,
    from: "2022-01-01",
  },
  {
    id: 2,
    designation: "Formation en distanciel (en jour)",
    price: 350.0,
    from: "2022-01-01",
  },
  {
    id: 3,
    designation:
      "Formation en présentiel mission longue (par heure travaillée)",
    price: 35.0,
    from: "2022-01-01",
  },
  {
    id: 4,
    designation:
      "Formation en distanciel mission longue (par heure travaillée)",
    price: 35.0,
    from: "2022-01-01",
  },
];

export const mockDataInvoice = [
  {
    id: 1,
    invoiceRef: "F20220401",
    customer: {
      id: 1,
      name: "TUTOS'ME SAS",
      address: "5 rue de Copenhague",
      zip: "93290",
      town: "Tremblay-en-France",
      phone: "01 84 60 68 62",
      website: "https://www.tutos.pro/",
      email: "contact@tutos.pro",
    },
    purchaseOrder: "8615",
    amount: 700.0,
    emittedOn: "2022-04-08",
    dueOn: "2022-05-15",
    paidOn: "2022-06-16",
    paymentMethod: 1,
    taxe: true,
    details: [
      {
        id: 2,
        label: "toto",
        quantity: 2,
        discount: 0,
      },
      {
        id: 1,
        label: "tata",
        quantity: 3,
        discount: 0,
      },
    ],
  },
  {
    id: 2,
    invoiceRef: "F20220501",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 105.0,
    emittedOn: "2022-05-31",
    dueOn: "2022-06-15",
    paidOn: "2022-06-10",
    paymentMethod: 1,
  },
  {
    id: 3,
    invoiceRef: "F20220601",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 857.5,
    emittedOn: "2022-06-30",
    dueOn: "2022-07-15",
    paidOn: "2022-07-07",
    paymentMethod: 1,
  },
  {
    id: 4,
    invoiceRef: "F20220701",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 3920.0,
    emittedOn: "2022-07-29",
    dueOn: "2022-08-15",
    paidOn: "2022-08-30",
    paymentMethod: 1,
  },
  {
    id: 5,
    invoiceRef: "F20220801",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 2817.5,
    emittedOn: "2022-08-31",
    dueOn: "2022-09-15",
    paidOn: "2022-09-09",
    paymentMethod: 1,
  },
  {
    id: 6,
    invoiceRef: "F20220901",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 5040.0,
    emittedOn: "2022-09-30",
    dueOn: "2022-10-15",
    paidOn: "2022-10-11",
    paymentMethod: 1,
  },
  {
    id: 7,
    invoiceRef: "F20221001",
    customer: {
      id: 2,
      name: "ID Formation",
      address: "113 rue de Copenhague",
      zip: "59600",
      town: "Lille",
      phone: "03 20 04 03 07",
      mobile: "06 31 82 96 06",
      website: "https://id-formation.com/",
      email: "Nathalie.Faidherbe@id-formation.fr",
    },
    amount: 4515.0,
    emittedOn: "2022-10-28",
    dueOn: "2022-11-15",
    paidOn: "2022-11-19",
    paymentMethod: 1,
  },
];

export const mockDataStats = {
  pendingInvoice: {
    late: 0,
    total: 0,
    toSend: 0,
  },
  turnover: {
    total: 17955.0,
    previousYearTotal: 0.0,
  },
  monthlyTurnover: [
    {
      month: 1,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 2,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 3,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 4,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 5,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 805.0,
      previousTurnover: 0.0,
    },
    {
      month: 6,
      year: 2022,
      realTurnover: 805.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 7,
      year: 2022,
      realTurnover: 857.5,
      estimatedTurnover: 857.5,
      previousTurnover: 0.0,
    },
    {
      month: 8,
      year: 2022,
      realTurnover: 3920.0,
      estimatedTurnover: 3920.0,
      previousTurnover: 0.0,
    },
    {
      month: 9,
      year: 2022,
      realTurnover: 2817.5,
      estimatedTurnover: 2817.5,
      previousTurnover: 0.0,
    },
    {
      month: 10,
      year: 2022,
      realTurnover: 5040.0,
      estimatedTurnover: 5040.0,
      previousTurnover: 0.0,
    },
    {
      month: 11,
      year: 2022,
      realTurnover: 4515.0,
      estimatedTurnover: 4515.0,
      previousTurnover: 0.0,
    },
    {
      month: 12,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 8085.0,
      previousTurnover: 0.0,
    },
  ],
  cumulatedTurnover: [
    {
      id: "real",
      data: [
        { x: 1, y: 0.0 },
        { x: 2, y: 0.0 },
        { x: 3, y: 0.0 },
        { x: 4, y: 0.0 },
        { x: 5, y: 0.0 },
        { x: 6, y: 805.0 },
        { x: 7, y: 1662.5 },
        { x: 8, y: 5582.5 },
        { x: 9, y: 8400.0 },
        { x: 10, y: 13440.0 },
        { x: 11, y: 17955.0 },
      ],
    },
    {
      id: "estimated",
      data: [
        { x: 1, y: 0.0 },
        { x: 2, y: 0.0 },
        { x: 3, y: 0.0 },
        { x: 4, y: 0.0 },
        { x: 5, y: 805.0 },
        { x: 6, y: 805.0 },
        { x: 7, y: 1662.5 },
        { x: 8, y: 5582.5 },
        { x: 9, y: 8400.0 },
        { x: 10, y: 13440.0 },
        { x: 11, y: 17955.0 },
        { x: 12, y: 26040.0 },
      ],
    },
    {
      id: "previous",
      data: [],
    },
  ],
  oldCumulatedTurnover: [
    {
      month: 1,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 2,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 3,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 4,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 5,
      year: 2022,
      realTurnover: 0.0,
      estimatedTurnover: 0.0,
      previousTurnover: 0.0,
    },
    {
      month: 6,
      year: 2022,
      realTurnover: 805.0,
      estimatedTurnover: 805.0,
      previousTurnover: 0.0,
    },
    {
      month: 7,
      year: 2022,
      realTurnover: 1662.5,
      estimatedTurnover: 1662.5,
      previousTurnover: 0.0,
    },
    {
      month: 8,
      year: 2022,
      realTurnover: 5582.5,
      estimatedTurnover: 5582.5,
      previousTurnover: 0.0,
    },
    {
      month: 9,
      year: 2022,
      realTurnover: 8400.0,
      estimatedTurnover: 8400.0,
      previousTurnover: 0.0,
    },
    {
      month: 10,
      year: 2022,
      realTurnover: 13440.0,
      estimatedTurnover: 13440.0,
      previousTurnover: 0.0,
    },
    {
      month: 11,
      year: 2022,
      estimatedTurnover: 17955.0,
      previousTurnover: 0.0,
    },
    {
      month: 12,
      year: 2022,
      estimatedTurnover: 26040.0,
      previousTurnover: 0.0,
    },
  ],
};
