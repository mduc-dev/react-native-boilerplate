import {
  FontFamilies,
  FontSizes,
  FontWeights,
  TypeTypography,
  Variants,
} from './type';

const families = {
  primary: 'Poppins-Regular',
  monospace: 'Poppins-SemiBold',
} as FontFamilies;

const sizes = {
  caption: 8,
  subheader: 16,
} as FontSizes;

const weights = {
  regular: '500',
  semiBold: '700',
} as FontWeights;

const variants = {
  captionStandard: {
    face: 'Poppins-Regular',
    size: 8,
    weight: '500',
  },
  subheaderStandard: {
    face: 'Poppins-Regular',
    size: 16,
    weight: '500',
  },
  subheaderSemibold: {
    face: 'Poppins-Regular',
    size: 16,
    weight: '700',
  },
} as Variants;

const Typography: TypeTypography = {
  families,
  sizes,
  weights,
  variants,
};

export default Typography;
