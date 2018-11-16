var Converter=Object();

Converter.convertToType = function(data, type) {
    if (data === null || data === undefined)
        return data;

    switch (type) {
        case 'Boolean':
            return Boolean(data);
        case 'Integer':
            return parseInt(data, 10);
        case 'Number':
            return parseFloat(data);
        case 'String':
            return String(data);
        case 'Date':
            return this.parseDate(String(data));
        case 'Blob':
            return data;
        default:
            if (type === Object) {
                // generic object, return directly
                return data;
            } else if (typeof type === 'function') {
                // for model type like: User
                return type.constructFromObject(data);
            } else if (Array.isArray(type)) {
                // for array type like: ['String']
                var itemType = type[0];
                return data.map(function(item) {
                    return Converter.convertToType(item, itemType);
                });
            } else if (typeof type === 'object') {
                // for plain object type like: {'String': 'Integer'}
                var keyType, valueType;
                for (var k in type) {
                    if (type.hasOwnProperty(k)) {
                        keyType = k;
                        valueType = type[k];
                        break;
                    }
                }
                var result = {};
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        var key = Converter.convertToType(k, keyType);
                        var value = Converter.convertToType(data[k], valueType);
                        result[key] = value;
                    }
                }
                return result;
            } else {
                // for unknown type, return the data directly
                return data;
            }
    }
};
module.exports = Converter;