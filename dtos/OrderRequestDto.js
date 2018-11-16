  /**
   * The OrderRequestDto model module.
   * @module model/OrderRequestDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');

    /**
   * Constructs a new <code>OrderRequestDto</code>.
   * @alias module:model/OrderRequestDto
   * @class
   * @param cart {Array.<module:model/CartItemDto>} 
   * @param discount {Number} 
   */
  var OrderRequestDto = function(cart, discount) {
    var _this = this;

    _this['cart'] = cart;
    _this['discount'] = discount;
  };

  /**
   * Constructs a <code>OrderRequestDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderRequestDto} obj Optional instance to populate.
   * @return {module:model/OrderRequestDto} The populated <code>OrderRequestDto</code> instance.
   */
  OrderRequestDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new OrderRequestDto();

      if (data.hasOwnProperty('cart')) {
        obj['cart'] = converter.convertToType(data['cart'], [CartItemDto]);
      }
      if (data.hasOwnProperty('discount')) {
        obj['discount'] = converter.convertToType(data['discount'], 'Number');
      }
    }
    return obj;
  };

  /**
   * @member {Array.<module:model/CartItemDto>} cart
   */
  OrderRequestDto.prototype['cart'] = undefined;
  /**
   * @member {Number} discount
   */
  OrderRequestDto.prototype['discount'] = undefined;


module.exports =OrderRequestDto;

