import { isVisa } from '@utils/card';
import { CSS_COLORS } from '@styles/variables.styles';

type Brightness = 'lighter' | 'darker';
export const useCardColor = (
  cardIsVisa: boolean,
  brightness: Brightness
) =>
  cardIsVisa
    ? brightness == 'lighter'
      ? CSS_COLORS.turquoise30
      : CSS_COLORS.turquoise50
    : brightness == 'lighter'
    ? CSS_COLORS.purple60
    : CSS_COLORS.purple90;
