export type ClientGroup = "government" | "private" | "industrial" | "commercial";

export type Client = {
  name: string;
  group: ClientGroup;
  logo?: string;
};

export const clients: Client[] = [
  { name: "Saudi Aramco", group: "government" },
  { name: "SABIC", group: "government" },
  { name: "Royal Commission for Jubail & Yanbu", group: "government" },
  { name: "Ministry of Industry & Mineral Resources", group: "government" },
  { name: "Saudi Electricity Company", group: "government" },
  { name: "Marafiq", group: "government" },

  { name: "Petro Rabigh", group: "industrial" },
  { name: "SATORP", group: "industrial" },
  { name: "Yanbu Aramco Sinopec Refining", group: "industrial" },
  { name: "Jubail United Petrochemical", group: "industrial" },
  { name: "Tasnee", group: "industrial" },
  { name: "Yanbu National Petrochemical", group: "industrial" },

  { name: "ACWA Power", group: "private" },
  { name: "Olayan Group", group: "private" },
  { name: "Bin Laden Group", group: "private" },
  { name: "Mada'in", group: "private" },
  { name: "Zamil Industrial", group: "private" },

  { name: "Riyadh Commercial Tower Operators", group: "commercial" },
  { name: "King Abdullah Economic City Developers", group: "commercial" },
  { name: "Roshn Group", group: "commercial" },
  { name: "Diriyah Gate Development Authority", group: "commercial" },
];

export const clientGroups: ClientGroup[] = ["government", "industrial", "private", "commercial"];
