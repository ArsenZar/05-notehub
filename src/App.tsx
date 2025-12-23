import { useWindowWidth } from './hooks/useWindowWidth';

export default function App() {
  const windowWidth = useWindowWidth();

  return <p>Current window width: {windowWidth}px</p>;
};
