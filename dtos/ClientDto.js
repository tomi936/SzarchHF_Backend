
  /**
   * The ClientDto model module.
   * @module model/ClientDto
   * @version 1.0.0
   */

  var converter = require('../middlewares/helpers/typeConverter');

  /**
   * Constructs a new <code>ClientDto</code>.
   * @alias module:model/ClientDto
   * @class
   * @param email {String} 
   * @param name {String} 
   * @param address {String} 
   * @param loyaltyPoints {Number} 
   */
  var ClientDto = function(email, name, address, loyaltyPoints) {
    var _this = this;

    _this['email'] = email;
    _this['name'] = name;
    _this['address'] = address;

    _this['loyaltyPoints'] = loyaltyPoints;
  };

  /**
   * Constructs a <code>ClientDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClientDto} obj Optional instance to populate.
   * @return {module:model/ClientDto} The populated <code>ClientDto</code> instance.
   */
  ClientDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new ClientDto();

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
      if (data.hasOwnProperty('loyaltyPoints')) {
        obj['loyaltyPoints'] = converter.convertToType(data['loyaltyPoints'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} email
   */
  ClientDto.prototype['email'] = undefined;
  /**
   * @member {String} name
   */
  ClientDto.prototype['name'] = undefined;
  /**
   * @member {String} address
   */
  ClientDto.prototype['address'] = undefined;
  /**
   * @member {String} password
   */
  ClientDto.prototype['password'] = undefined;
  /**
   * @member {Number} loyaltyPoints
   */
  ClientDto.prototype['loyaltyPoints'] = undefined;


module.exports = ClientDto;
