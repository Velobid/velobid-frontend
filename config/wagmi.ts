import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';

const WagmiConfig = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '4f48723d8327495fccfe00d1dca96bab',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default WagmiConfig