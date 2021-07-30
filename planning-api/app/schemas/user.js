const Joi = require("joi");

const schema = Joi.object({
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  phone_number: Joi.string().allow(null, '').pattern(new RegExp('^(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}$')),
  role: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.string().allow(null, ''),
  birth_date: Joi.string().allow(null, ''),
  birth_city: Joi.string().allow(null, ''),
  birth_department: Joi.string().allow(null, ''),
  ssn: Joi.string().allow(null, '').pattern(new RegExp('^([1-4]|[7-8])([\\s.-]?)(\\d{2})([\\s.-]?)(0[1-9]|1[0-2]|[2-3][0-9]|4[0-2]|[5-9][0-9])([\\s.-]?)(0[1-9]|[1-9][0-9]|2[a-bA-B])([\\s.-]?)((?!000)(\\d{3})([\\s.-]?)){2}(0[1-9]|[1-8][0-9]|9[0-7])$')),
  intermittent_registration: Joi.string().allow(null, ''),
  legal_entity: Joi.string().allow(null, ''),
  siret: Joi.string().allow(null, '').pattern(new RegExp('^(\\d[\\s.-]?){14}$')),
  emergency_contact: Joi.string().allow(null, ''),
  emergency_phone_number: Joi.string().allow(null, ''),
  comments: Joi.string().allow(null, ''),
  address_id: Joi.number().allow(null)
});

module.exports = schema;
