
  /**
   * The ClientRegisterDto model module.
   * @module model/ClientRegisterDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');

  /**
   * Constructs a new <code>ClientRegisterDto</code>.
   * @alias module:model/ClientRegisterDto
   * @class
   * @param email {String} 
   * @param name {String} 
   * @param address {String} 
   * @param password {String} 
   */
  var ClientRegisterDto = function(email, name, address, password) {
    var _this = this;

    _this['email'] = email;
    _this['name'] = name;
    _this['address'] = address;
    _this['password'] = password;
  };

  /**
   * Constructs a <code>ClientRegisterDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClientRegisterDto} obj Optional instance to populate.
   * @return {module:model/ClientRegisterDto} The populated <code>ClientRegisterDto</code> instance.
   */
  ClientRegisterDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new ClientRegisterDto();

      if (data.hasOwnProperty('email')) {
        obj['email'] = converter.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = converter.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('address')) {
        obj['address'] = converter.convertToType(data['address'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = converter.convertToType(data['password'], 'String');
      }
    }
    return obj;
  };

  /**
   * @member {String} email
   */
  ClientRegisterDto.prototype['email'] = undefined;
  /**
   * @member {String} name
   */
  ClientRegisterDto.prototype['name'] = undefined;
  /**
   * @member {String} address
   */
  ClientRegisterDto.prototype['address'] = undefined;
  /**
   * @member {String} password
   */
  ClientRegisterDto.prototype['password'] = undefined;


module.exports = ClientRegisterDto;

