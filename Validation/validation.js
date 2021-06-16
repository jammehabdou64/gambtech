class Validation {
  constructor(request, response, next) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.validationError = {};
    this.request.validationError = this.validationError;
    // this.err = error;
  }
  //add validtion
  addValidationError(field, value) {
    return (this.validationError[`${field}`] = `${this.capitalize(
      field
    )} ${value}`);
  }
  //to capitilize string
  capitalize(str) {
    return `${str[0].toLocaleUpperCase()}${str.slice(1)}`;
  }

  //check if empty
  required(...fields) {
    return [...fields].filter((field) => {
      let fieldData = this.request.body[field];
      return fieldData
        ? { field: fieldData }
        : this.addValidationError(field, "is required");
    });
  }
  //check email is valid
  email(field) {
    const data = { ...this.request.body };
    if (data.hasOwnProperty(field)) {
      const emailRegEx = /^[\w\.]+[@]\w+[.]\w+$/;
      return emailRegEx.test(data[field])
        ? true
        : this.addValidationError(field, "is invalid");
    }
    return this.required(field);
  }
  // check min value
  min(field, min) {
    const data = { ...this.request.body };
    if (data.hasOwnProperty(field)) {
      return data[field].length < min
        ? this.addValidationError(field, `should be minimum of ${min}`)
        : false;
    }
    return this.required(field);
  }

  // check min value
  max(field, max) {
    const data = { ...this.request.body };

    if (data.hasOwnProperty(field)) {
      return data[field].length > max
        ? this.addValidationError(field, `should be maximum of ${max}`)
        : false;
    }
    return this.required(field);
  }

  async exist(field, tableName) {
    const data = this.request.body[field];
    const Table = require(`${require("app-root-path")}/app/Models/${tableName}`);
    const user = await Table.findOne({ [field]: data });
    if (user) {
      return this.addValidationError(field, ` already exist`);
    }

    // return false;
  }

  match(firstField, secondField) {
    const data = { ...this.request.body };
    if (data.hasOwnProperty(firstField) && data.hasOwnProperty(secondField)) {
      return data[firstField] === data[secondField]
        ? false
        : (this.validationError[
            `${secondField}`
          ] = `${firstField} not match with ${secondField}`);
    }
    return this.required(firstField, secondField);
  }

  gt(firstField, secondField) {
    const data = { ...this.request.body };
    if (data.hasOwnProperty(firstField) && data.hasOwnProperty(secondField)) {
      return data[firstField] > data[secondField]
        ? true
        : (this.validationError[`${firstField}`] = `${this.capitalize(
            firstField
          )} is not greater than ${secondField}`);
    }
    return this.required(firstField, secondField);
  }
  int(field) {
    const data = { ...this.request };
    if (data.hasOwnProperty(field)) {
      return Number(data[field]);
    }
    return this.required(field);
  }

  lt(firstField, secondField) {
    try {
      const data = { ...this.request.body };
      if (data.hasOwnProperty(firstField) && data.hasOwnProperty(secondField)) {
        return Number(data[firstField]) < Number(data[secondField])
          ? true
          : (this.validationError[`${firstField}`] = `${this.capitalize(
              firstField
            )} is not lesser than ${secondField}`);
      }

      return this.required(firstField, secondField);
    } catch (err) {
      console.log({ ltValidation: err });
    }
  }
}

module.exports = Validation;
