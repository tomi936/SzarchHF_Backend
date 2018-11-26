
  /**
   * The CartItemDto model module.
   * @module model/CartItemDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');
  /**
   * Constructs a new <code>CartItemDto</code>.
   * @alias module:model/CartItemDto
   * @class
   * @param menuItemId {String}
   * @param amount {Number}
   */

  var CarItemDto = function(menuItemId, amount) {
    var _this = this;

    _this['menuItemId'] = menuItemId;
    _this['amount'] = amount;
  };

  /**
   * Constructs a <code>CartItemDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CartItemDto} obj Optional instance to populate.
   * @return {module:model/CartItemDto} The populated <code>CartItemDto</code> instance.
   */
  CarItemDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new CarItemDto();

      if (data.hasOwnProperty('_menuItemId')&& data['_menuItemId'].hasOwnProperty('_id')) {
        obj['menuItemId'] = converter.convertToType(data['_menuItemId']['_id'], 'String');
      }
      if (data.hasOwnProperty('menuItemId')) {
        obj['menuItemId'] = converter.convertToType(data['menuItemId'], 'String');
      }
        if (data.hasOwnProperty('_menuItemId')) {
            obj['menuItemId'] = converter.convertToType(data['_menuItemId'], 'String');
        }
      if (data.hasOwnProperty('menuItemId')&& data['menuItemId'].hasOwnProperty('_id')) {
        obj['menuItemId'] = converter.convertToType(data['menuItemId']['_id'], 'String');
      }
      if (data.hasOwnProperty('amount')) {
        obj['amount'] = converter.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('_menuItemId')&& data['_menuItemId'].hasOwnProperty('name') ) {
        obj['name'] = converter.convertToType(data['_menuItemId']['name'], 'String');
      }
      if (data.hasOwnProperty('menuItemId')&& data['menuItemId'].hasOwnProperty('name') ) {
          obj['name'] = converter.convertToType(data['menuItemId']['name'], 'String');
      }
    }
    return obj;
  };

  /**
   * @member {String} menuItemId
   */
  CarItemDto.prototype['menuItemId'] = undefined;
  /**
   * @member {Number} amount
   */
  CarItemDto.prototype['amount'] = undefined;
  /**
   * @member {String} name
   */
  CarItemDto.prototype['name'] = undefined;



module.exports = CarItemDto;


