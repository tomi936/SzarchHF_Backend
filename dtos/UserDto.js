  /**
   * The UserDto model module.
   * @module model/UserDto
   * @version 1.0.0
   */

  var converter = require('../middlewares/helpers/typeConverter');

    /**
   * Constructs a new <code>UserDto</code>.
   * @alias module:model/UserDto
   * @class
   * @param email {String} 
   * @param name {String} 
   */
  var UserDto = function(email, name) {
    var _this = this;

    _this['email'] = email;
    _this['name'] = name;


  };

  /**
   * Constructs a <code>UserDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDto} obj Optional instance to populate.
   * @return {module:model/UserDto} The populated <code>UserDto</code> instance.
   */
  UserDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new UserDto();

      if (data.hasOwnProperty('email')) {
        obj['email'] = converter.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = converter.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = converter.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('address')) {
        obj['address'] = converter.convertToType(data['address'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} email
   */
  UserDto.prototype['email'] = undefined;
  /**
   * @member {String} name
   */
  UserDto.prototype['name'] = undefined;
  /**
   * @member {String} password
   */
  UserDto.prototype['password'] = undefined;
  /**
   * @member {String} address
   */
  UserDto.prototype['address'] = undefined;

module.exports = UserDto;

