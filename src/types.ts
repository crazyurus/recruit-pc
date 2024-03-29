interface Location {
  latitude: number;
  longitude: number;
}

interface Contact {
  name: string;
  email: string;
  telephone: string;
}

export interface School {
  id: string;
  name: string;
}

export enum Status {
  IN_PROGRESS = 1,
  CANCELED,
  EXPIRED,
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: string;
  region: string;
  industry: string;
  scale: string;
  registeredCapital: string;
  website: string;
  address: string;
  createTime: string;
  verifyTime: string;
  license: string;
  position: Location;
  introduction: string;
  tags: string[];
}

export interface SeminarBase {
  id: string;
  title: string;
}

export interface Seminar extends SeminarBase {
  company: Pick<Company, 'id' | 'name' | 'logo' | 'description'>;
  university: string;
  address: string;
  view: number;
  time: string;
  status: Status;
}

export interface SeminarDetail extends Seminar {
  company: Company;
  content: string;
  tips: string;
  poster: string;
  contact: Contact;
  major: string[];
}
