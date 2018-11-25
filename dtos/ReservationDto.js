  /**
   * The ReservationDto model module.
   * @module model/ReservationDto
   * @version 1.0.0
   */

  var converter = require('../helpers/typeConverter');

    /**
   * Constructs a new <code>ReservationDto</code>.
   * @alias module:model/ReservationDto
   * @class
   * @param tableId {String} 
   * @param time {Date} 
   * @param duration {Number} 
   * @param personNumber {Number} 
   */
  var ReservationDto = function(tableId, time, duration, personNumber) {
    var _this = this;

    _this['tableId'] = tableId;
    _this['time'] = time;
    _this['duration'] = duration;


    _this['personNumber'] = personNumber;


  };

  /**
   * Constructs a <code>ReservationDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ReservationDto} obj Optional instance to populate.
   * @return {module:model/ReservationDto} The populated <code>ReservationDto</code> instance.
   */
  ReservationDto.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new ReservationDto();

      if (data.hasOwnProperty('tableId')) {
        obj['tableId'] = converter.convertToType(data['tableId'], 'String');
      }
      if (data.hasOwnProperty('startTime')) {
        obj['time'] = converter.convertToType(data['startTime'], 'Date');
      }
      if (data.hasOwnProperty('endTime') && data.hasOwnProperty('startTime')) {
        obj['duration'] = converter.convertToType(Math.floor(Math.abs(new Date(data['endTime']) - new Date(data['startTime']))/(1000*60*60)), 'Number');
      }
      if (data.hasOwnProperty('_id')) {
        obj['reservationId'] = converter.convertToType(data['_id'], 'String');
      }
      if (data.hasOwnProperty('status')) {

        obj['status'] = converter.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('personNumber')) {
        obj['personNumber'] = converter.convertToType(data['personNumber'], 'Number');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = converter.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('waiterId')) {
        obj['waiterId'] = converter.convertToType(data['waiterId'], 'String');
      }
    }
    return obj;
  };

  /**
   * @member {String} tableId
   */
  ReservationDto.prototype['tableId'] = undefined;
  /**
   * @member {Date} time
   */
  ReservationDto.prototype['time'] = undefined;
  /**
   * @member {Number} duration
   */
  ReservationDto.prototype['duration'] = undefined;
  /**
   * @member {String} reservationId
   */
  ReservationDto.prototype['reservationId'] = undefined;
  /**
   * @member {String} status
   */
  ReservationDto.prototype['status'] = undefined;
  /**
   * @member {Number} personNumber
   */
  ReservationDto.prototype['personNumber'] = undefined;
  /**
   * @member {String} clientId
   */
  ReservationDto.prototype['clientId'] = undefined;
  /**
   * @member {String} waiterId
   */
  ReservationDto.prototype['waiterId'] = undefined;

module.exports = ReservationDto;
