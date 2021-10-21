import { Knowledge } from './Knowledge';

export function GetVersion(annotation: any) {
  return annotation.version || Knowledge.get(annotation) || 0;
}
