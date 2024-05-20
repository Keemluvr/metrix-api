export const CPF_REGEX = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/i;

export const RG_REGEX = /^(\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1})$/;

export const CEP_REGEX = /^([0-9]{5})-?([0-9]{3})$/;

export const PHONE_REGEX = /^([0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4})$/;

export const NON_NUMERIC_REGEX = /[^0-9]/g;

export const DATE_FORMAT_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export const CAMEL_CASE_REGEX = /([a-z])([A-Z])/g;
