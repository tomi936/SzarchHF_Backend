
  /**
   * The OrderDto model module.
   * @module model/OrderDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');
  var CartItemDto = require('./CartItemDto');

  /**
   * Constructs a new <code>OrderDto</code>.
   * @alias module:model/OrderDto
   * @class
   * @param orderId {String} 
   * @param orderItems {Array.<module:model/CartItemDto>} 
   */
  var OrderDto = function(orderId, orderItems) {
    var _this = this;

    _this['orderId'] = orderId;
    _this['orderItems'] = orderItems;
  };

  /**
   * Constructs a <code>OrderDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderDto} obj Optional instance to populate.
   * @return {module:model/OrderDto} The populated <code>OrderDto</code> instance.
   */
  OrderDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new OrderDto();

      if (data.hasOwnProperty('orderId')) {
        obj['orderId'] = converter.convertToType(data['orderId'], 'String');
      }
      if (data.hasOwnProperty('_id')) {
        obj['orderId'] = converter.convertToType(data['_id'], 'String');
      }
      if (data.hasOwnProperty('orderItems')) {
        obj['orderItems'] = converter.convertToType(data['orderItems'], [CartItemDto]);
      }
      if (data.hasOwnProperty('time')) {
        obj['time'] = converter.convertToType(data['time'], 'Date');
      }
      if (data.hasOwnProperty('sum')) {
        obj['sum'] = converter.convertToType(data['sum'], 'Number');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = converter.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('_tableId')) {
        obj['_tableId'] = converter.convertToType(data['_tableId'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = converter.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('_ownerId')) {
        obj['_ownerId'] = converter.convertToType(data['_ownerId'], 'String');
      }
      if (data.hasOwnProperty('ownerName')) {
        obj['ownerName'] = converter.convertToType(data['ownerName'], 'String');
      }
      if (data.hasOwnProperty('address')) {
        obj['address'] = converter.convertToType(data['address'], 'String');
      }
      if (data.hasOwnProperty('rating')) {
        obj['rating'] = converter.convertToType(data['rating'], 'Number');
      }
      if (data.hasOwnProperty('discount')) {
        obj['discount'] = converter.convertToType(data['discount'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} orderId
   */
  OrderDto.prototype['orderId'] = undefined;
  /**
   * @member {Array.<module:model/CartItemDto>} orderItems
   */
  OrderDto.prototype['orderItems'] = undefined;
  /**
   * @member {Date} time
   */
  OrderDto.prototype['time'] = undefined;
  /**
   * @member {Number} sum
   */
  OrderDto.prototype['sum'] = undefined;
  /**
   * @member {String} status
   */
  OrderDto.prototype['status'] = undefined;
  /**
   * @member {String} tableId
   */
  OrderDto.prototype['_tableId'] = undefined;
  /**
   * @member {String} type
   */
  OrderDto.prototype['type'] = undefined;
  /**
   * @member {String} ownerId
   */
  OrderDto.prototype['_ownerId'] = undefined;
  /**
   * @member {String} ownerName
   */
  OrderDto.prototype['ownerName'] = undefined;
  /**
   * @member {String} address
   */
  OrderDto.prototype['address'] = undefined;
  /**
   * @member {Number} rating
   */
  OrderDto.prototype['rating'] = undefined;
  /**
   * @member {Number} discount
   */
  OrderDto.prototype['discount'] = undefined;

module.exports=OrderDto;
