/**
 * Mappers Index
 * Central export point for all data mappers
 *
 * Usage:
 * import { adminMapper, agentMapper, ... } from '@/admin/mappers';
 *
 * Or for specific mapper:
 * import adminMapper from '@/admin/mappers/adminMapper';
 */

export { default as adminMapper } from './adminMapper';
export { default as agentMapper } from './agentMapper';
export { default as bookingMapper } from './bookingMapper';
export { default as locationImageMapper } from './locationImageMapper';
export { default as locationMapper } from './locationMapper';
export { default as packageLocationMapper } from './packageLocationMapper';
export { default as packageMapper } from './packageMapper';
