// source: monitor.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.monitor.StatsResponse');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.monitor.CPUStatsResponse');
goog.require('proto.monitor.Disk_usage');
goog.require('proto.monitor.Memory_usage');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.monitor.StatsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.monitor.StatsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.monitor.StatsResponse.displayName = 'proto.monitor.StatsResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.monitor.StatsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.monitor.StatsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.monitor.StatsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.monitor.StatsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    cpuUsageTotal: (f = msg.getCpuUsageTotal()) && proto.monitor.CPUStatsResponse.toObject(includeInstance, f),
    memoryUsage: (f = msg.getMemoryUsage()) && proto.monitor.Memory_usage.toObject(includeInstance, f),
    diskUsage: (f = msg.getDiskUsage()) && proto.monitor.Disk_usage.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.monitor.StatsResponse}
 */
proto.monitor.StatsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.monitor.StatsResponse;
  return proto.monitor.StatsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.monitor.StatsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.monitor.StatsResponse}
 */
proto.monitor.StatsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.monitor.CPUStatsResponse;
      reader.readMessage(value,proto.monitor.CPUStatsResponse.deserializeBinaryFromReader);
      msg.setCpuUsageTotal(value);
      break;
    case 2:
      var value = new proto.monitor.Memory_usage;
      reader.readMessage(value,proto.monitor.Memory_usage.deserializeBinaryFromReader);
      msg.setMemoryUsage(value);
      break;
    case 3:
      var value = new proto.monitor.Disk_usage;
      reader.readMessage(value,proto.monitor.Disk_usage.deserializeBinaryFromReader);
      msg.setDiskUsage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.monitor.StatsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.monitor.StatsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.monitor.StatsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.monitor.StatsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCpuUsageTotal();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.monitor.CPUStatsResponse.serializeBinaryToWriter
    );
  }
  f = message.getMemoryUsage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.monitor.Memory_usage.serializeBinaryToWriter
    );
  }
  f = message.getDiskUsage();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.monitor.Disk_usage.serializeBinaryToWriter
    );
  }
};


/**
 * optional CPUStatsResponse cpu_usage_total = 1;
 * @return {?proto.monitor.CPUStatsResponse}
 */
proto.monitor.StatsResponse.prototype.getCpuUsageTotal = function() {
  return /** @type{?proto.monitor.CPUStatsResponse} */ (
    jspb.Message.getWrapperField(this, proto.monitor.CPUStatsResponse, 1));
};


/**
 * @param {?proto.monitor.CPUStatsResponse|undefined} value
 * @return {!proto.monitor.StatsResponse} returns this
*/
proto.monitor.StatsResponse.prototype.setCpuUsageTotal = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.monitor.StatsResponse} returns this
 */
proto.monitor.StatsResponse.prototype.clearCpuUsageTotal = function() {
  return this.setCpuUsageTotal(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.monitor.StatsResponse.prototype.hasCpuUsageTotal = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Memory_usage memory_usage = 2;
 * @return {?proto.monitor.Memory_usage}
 */
proto.monitor.StatsResponse.prototype.getMemoryUsage = function() {
  return /** @type{?proto.monitor.Memory_usage} */ (
    jspb.Message.getWrapperField(this, proto.monitor.Memory_usage, 2));
};


/**
 * @param {?proto.monitor.Memory_usage|undefined} value
 * @return {!proto.monitor.StatsResponse} returns this
*/
proto.monitor.StatsResponse.prototype.setMemoryUsage = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.monitor.StatsResponse} returns this
 */
proto.monitor.StatsResponse.prototype.clearMemoryUsage = function() {
  return this.setMemoryUsage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.monitor.StatsResponse.prototype.hasMemoryUsage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Disk_usage disk_usage = 3;
 * @return {?proto.monitor.Disk_usage}
 */
proto.monitor.StatsResponse.prototype.getDiskUsage = function() {
  return /** @type{?proto.monitor.Disk_usage} */ (
    jspb.Message.getWrapperField(this, proto.monitor.Disk_usage, 3));
};


/**
 * @param {?proto.monitor.Disk_usage|undefined} value
 * @return {!proto.monitor.StatsResponse} returns this
*/
proto.monitor.StatsResponse.prototype.setDiskUsage = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.monitor.StatsResponse} returns this
 */
proto.monitor.StatsResponse.prototype.clearDiskUsage = function() {
  return this.setDiskUsage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.monitor.StatsResponse.prototype.hasDiskUsage = function() {
  return jspb.Message.getField(this, 3) != null;
};


