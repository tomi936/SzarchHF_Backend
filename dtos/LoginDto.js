
  /**
   * The LoginDto model module.
   * @module model/LoginDto
   * @version 1.0.0
   */

  var converter = require('../middlewares/helpers/typeConverter');

  /**
   * Constructs a new <code>LoginDto</code>.
   * @alias module:model/LoginDto
   * @class
   * @param email {String} 
   * @param password {String} 
   */
  var LoginDto = function(email, password) {
    var _this = this;

    _this['email'] = email;
    _this['password'] = password;
  };

  /**
   * Constructs a <code>LoginDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginDto} obj Optional instance to populate.
   * @return {module:model/LoginDto} The populated <code>LoginDto</code> instance.
   */
  LoginDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new LoginDto();

      if (data.hasOwnProperty('email')) {
        obj['email'] = converter.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = converter.convertToType(data['password'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} email
   */
  LoginDto.prototype['email'] = undefined;
  /**
   * @member {String} password
   */
  LoginDto.prototype['password'] = undefined;


module.exports=LoginDto;


