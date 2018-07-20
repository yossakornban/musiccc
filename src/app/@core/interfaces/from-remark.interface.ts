export const number = new RegExp('^\\d*$');
export const string = new RegExp('^[A-Za-z]$')
export const text = new RegExp('^[a-zA-Z0-9]+$');
export const ddmmyyyy = new RegExp('\\d{2}[\/-]\\d{2}[\/-]\\d{4}'); 
export const email= new RegExp('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})*$');
export const telephone = new RegExp('^\\d{3}[-]\\d{3}[-]\\d{3}(\\d{1})?[-]?(\\d{4})?$');
export const tax = new RegExp('^\\d{13}$');
export const idCard = new RegExp('^\\d{13}$');
export const fax = new RegExp('^\\d{1}[-]\\d{4}[-]\\d{4}[-]?\\d{4}?$');