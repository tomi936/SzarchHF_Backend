
  /**
   * The MenuItemDto model module.
   * @module model/MenuItemDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');

  /**
   * Constructs a new <code>MenuItemDto</code>.
   * @alias module:model/MenuItemDto
   * @class
   * @param menuItemId {String} 
   */
  var MenuItemDto = function(menuItemId) {
    var _this = this;

    _this['menuItemId'] = menuItemId;


  };

  /**
   * Constructs a <code>MenuItemDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MenuItemDto} obj Optional instance to populate.
   * @return {module:model/MenuItemDto} The populated <code>MenuItemDto</code> instance.
   */
  MenuItemDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new MenuItemDto();

      if (data.hasOwnProperty('menuItemId')) {
        obj['menuItemId'] = converter.convertToType(data['menuItemId'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = converter.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = converter.convertToType(data['price'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} menuItemId
   */
  MenuItemDto.prototype['menuItemId'] = undefined;
  /**
   * @member {String} name
   */
  MenuItemDto.prototype['name'] = undefined;
  /**
   * @member {Number} price
   */
  MenuItemDto.prototype['price'] = undefined;

module.exports=MenuItemDto;


