export interface Representant {
  role: string;
  nom: string;
}

export interface ContactData {
  email: string;
  permanence: string;
  lieu: string;
  representants: Representant[];
  messageRelais: string;
}

export const contactData: ContactData = {
  email: "contact@focom-supportsbanquepostale.fr",
  permanence: "mardi et jeudi de 12h30 a 14h00",
  lieu: "Immeuble ICV 2 CNP Assurance, Issy Les Moulineaux",
  representants: [
    { role: "Coordinateur syndical", nom: "Guillaume DUMAS" },
    { role: "Elu CSE", nom: "Ana-Maria VAZQUEZ" },
    { role: "Referente QVCT", nom: "Sandrine Birais" },
  ],
  messageRelais:
    "Les messages peuvent aussi etre relayes vers les representants locaux pour les equipes Supports BP et CNP.",
};
