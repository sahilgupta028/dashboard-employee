export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}