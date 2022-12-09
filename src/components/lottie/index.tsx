import React, {useEffect, useRef} from 'react';

import type AnimatedLottieView from 'lottie-react-native';
import Lottie, {AnimatedLottieViewProps} from 'lottie-react-native';
import {AppState, StyleProp, ViewStyle} from 'react-native';

type AnimatedLottie = AnimatedLottieViewProps & {
  source: string;
  autoPlay: boolean;
  loop: boolean;
  style?: StyleProp<ViewStyle>;
};
export const LottieWrap = (props: AnimatedLottie) => {
  const ref = useRef<AnimatedLottieView>(null);

  useEffect(() => {
    console.log(1232222);
    AppState.addEventListener('change', state => {
      if (state === 'active') {
        ref?.current?.resume();
      }
    });
  });

  return <Lottie {...props} ref={ref} />;
};
