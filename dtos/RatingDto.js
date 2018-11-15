  /**
   * The RatingDto model module.
   * @module model/RatingDto
   * @version 1.0.0
   */

  var converter = require('../middlewares/helpers/typeConverter');

    /**
   * Constructs a new <code>RatingDto</code>.
   * @alias module:model/RatingDto
   * @class
   * @param orderId {String} 
   * @param rating {Number} 
   */
  var RatingDto = function(orderId, rating) {
    var _this = this;

    _this['orderId'] = orderId;
    _this['rating'] = rating;
  };

  /**
   * Constructs a <code>RatingDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RatingDto} obj Optional instance to populate.
   * @return {module:model/RatingDto} The populated <code>RatingDto</code> instance.
   */
  RatingDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new RatingDto();

      if (data.hasOwnProperty('orderId')) {
        obj['orderId'] = converter.convertToType(data['orderId'], 'String');
      }
      if (data.hasOwnProperty('rating')) {
        obj['rating'] = converter.convertToType(data['rating'], 'Number');
      }
    }
    return obj;
  };

  /**
   * @member {String} orderId
   */
  RatingDto.prototype['orderId'] = undefined;
  /**
   * @member {Number} rating
   */
  RatingDto.prototype['rating'] = undefined;

module.exports = RatingDto;


