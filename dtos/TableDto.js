  /**
   * The TableDto model module.
   * @module model/TableDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');

    /**
   * Constructs a new <code>TableDto</code>.
   * @alias module:model/TableDto
   * @class
   * @param tableId {String} 
   * @param seats {Number} 
   */
  var TableDto = function(tableId, seats) {
    var _this = this;

    _this['tableId'] = tableId;
    _this['seats'] = seats;
  };

  /**
   * Constructs a <code>TableDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TableDto} obj Optional instance to populate.
   * @return {module:model/TableDto} The populated <code>TableDto</code> instance.
   */
  TableDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new TableDto();

      if (data.hasOwnProperty('tableId')) {
        obj['tableId'] = converter.convertToType(data['tableId'], 'String');
      }
      if (data.hasOwnProperty('seats')) {
        obj['seats'] = converter.convertToType(data['seats'], 'Number');
      }
    }
    return obj;
  };

  /**
   * @member {String} tableId
   */
  TableDto.prototype['tableId'] = undefined;
  /**
   * @member {Number} seats
   */
  TableDto.prototype['seats'] = undefined;

module.exports = TableDto;


