import React, { ReactNode } from 'react';

export type Indent =
  | 'none'
  | 'xsmall'
  | 'small'
  | 'xmedium'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'vlarge';

export interface IndentStylesProps {
  $top?: Indent;
  $left?: Indent;
}

export type FontSize =
  | 'small'
  | 'medium'
  | 'default'
  | 'big'
  | 'title'
  | 'subheader'
  | 'header'
  | 'heroMedium'
  | 'heroLarge';

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface SidebarMenuLink {
  key: string;
  icon: ReactNode;
  label: string;
  path: string;
}

export interface SidebarMenuSubs {
  type: 'divider';
}

export type SidebarMenuItem = SidebarMenuSubs | SidebarMenuLink;

export interface FormControlProps {
  name: string;
}

export interface PaginationQueryParams {
  limit: number;
  offset: number;
}

export interface TabsItem {
  label: string;
  key: string;
  children: string | ReactNode;
}

export interface CategoryItem {
  id: number;
  title: string;
}

// Тип для успешного ответа
interface SuccessResponse {
  Info: string; // или просто string, если это единственное поле
}

// Тип для ошибки валидации
interface ValidationError {
  loc: (string | number)[]; // Массив строк и/или чисел
  msg: string; // Сообщение об ошибке
  type: string; // Тип ошибки
}

// Тип для ответа с ошибкой
interface ErrorResponse {
  detail: ValidationError[]; // Массив ошибок валидации
}

// Объединенный тип для ответа
export type ApiResponse = SuccessResponse | ErrorResponse;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
