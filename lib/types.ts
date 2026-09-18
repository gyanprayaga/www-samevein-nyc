export type MerchItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type Show = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  neighborhood: string;
  with: string[];
  ticketsUrl: string;
  poster: string;
  age: string;
  price: string;
  note: string;
};

export type SiteContent = {
  bookingEmail: string;
  ticker: string[];
  homeNote: string;
  youtube: string;
  spotify: string;
  soundcloud: string;
  merch: MerchItem[];
  shows: Show[];
};
