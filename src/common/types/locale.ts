import type { LanguageCode } from '@/common/constants/locale';

export interface Message {
  [key: string]: string | Message;
}

export type Translations = Record<LanguageCode, Message>;
