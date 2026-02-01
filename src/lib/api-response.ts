import { NextResponse } from 'next/server'

/**
 * Standardized API response types for consistency across all routes
 */

export type ApiSuccessResponse<T> = {
  success: true
  data: T
}

export type ApiErrorResponse = {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Helper functions for creating consistent API responses
 */
export function successResponse<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(error: string, status = 400, code?: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error, ...(code && { code }) }, { status })
}

/**
 * Common error responses
 */
export const ApiErrors = {
  unauthorized: () => errorResponse('Unauthorized', 401, 'UNAUTHORIZED'),
  forbidden: () => errorResponse('Forbidden', 403, 'FORBIDDEN'),
  notFound: (resource = 'Resource') => errorResponse(`${resource} not found`, 404, 'NOT_FOUND'),
  badRequest: (message: string) => errorResponse(message, 400, 'BAD_REQUEST'),
  internal: (message = 'Internal server error') => errorResponse(message, 500, 'INTERNAL_ERROR'),
  rateLimit: () => errorResponse('Too many requests. Please wait a moment.', 429, 'RATE_LIMITED'),
  validation: (message: string) => errorResponse(message, 400, 'VALIDATION_ERROR'),
} as const
