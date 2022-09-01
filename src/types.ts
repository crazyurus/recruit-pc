interface Location {
  latitude: number;
  longitude: number;
}

interface Contact {
  name: string;
  email: string;
  telephone: string;
}

export interface Status {
  isExpired: boolean;
  isCancel: boolean;
  isOfficial: boolean;
  isInProgress: boolean;
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

export interface Seminar {
  id: string;
  title: string;
  company: Pick<Company, 'id' | 'name' | 'logo' | 'description'>,
  university: string;
  address: string;
  view: number;
  time: string;
  status: number;
  source: string;
}

export interface SeminarDetail extends Seminar {
  company: Company;
  content: string;
  tips: string;
  poster: string;
  contact: Contact;
  major: string[];
}
