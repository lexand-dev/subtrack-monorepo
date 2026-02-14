import type { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseFactory {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
  ): ApiResponse<T[]> {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
      timestamp: new Date().toISOString(),
    };
  }

  // Using in Exception Filter
  static error(
    message: string,
    statusCode: number,
    errors?: any[],
    path?: string,
  ): ApiResponse<null> {
    return {
      success: false,
      error: {
        message,
        statusCode,
        errors,
      },
      path,
      timestamp: new Date().toISOString(),
    };
  }
}
