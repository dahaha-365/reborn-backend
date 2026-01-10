import { getSchemaPath } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

/**
 * 类构造函数类型
 * @template T 类实例类型
 */
export type ClassConstructor<T = any> = new (...args: any[]) => T;

/**
 * Schema 对象类型
 * 可以是 NestJS Type、类构造函数或字符串引用
 */
export type SchemaObjectType = Type<any> | ClassConstructor | string;

/**
 * 创建 API 响应 Schema，支持泛型包装类型
 * @param wrapperClass 外层包装类（如 EdiBackendSuccessDto）
 * @param dataClass 内层数据类（可选）
 * @param isArray 数据是否为数组类型
 * @returns Swagger Schema 对象
 *
 * @example
 * // 单个对象
 * createApiResponseSchema(EdiBackendSuccessDto, UserDto)
 *
 * @example
 * // 数组
 * createApiResponseSchema(EdiBackendSuccessDto, UserDto, true)
 */
export function createApiResponseSchema(
  wrapperClass: SchemaObjectType,
  dataClass?: SchemaObjectType,
  isArray = false, // 添加数组标志
) {
  if (!dataClass) {
    return {
      $ref: getSchemaPath(wrapperClass),
    };
  }

  const dataSchema = isArray
    ? {
        type: 'array',
        items: { $ref: getSchemaPath(dataClass) },
      }
    : {
        $ref: getSchemaPath(dataClass),
      };

  return {
    allOf: [
      { $ref: getSchemaPath(wrapperClass) },
      {
        properties: {
          data: dataSchema,
        },
      },
    ],
  };
}
