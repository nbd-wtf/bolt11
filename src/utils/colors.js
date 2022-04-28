import { TAG_COLORS, DEFAULT_OVERLAY_COLOR } from '../constants/tag-colors'

export const getTagColor = (name) => {
  return TAG_COLORS[name] || DEFAULT_OVERLAY_COLOR
}
