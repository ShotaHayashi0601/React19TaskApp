import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { IMAGES, PATHS } from '@/constants';

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const ScrollLogoButton = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const handleLogoClick = () => {
    if (location.pathname === PATHS.ROOT) {
      scrollToTop();
    } else {
      navigation(PATHS.ROOT);
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-[48px] h-[48px] rounded-full"
      onClick={handleLogoClick}
    >
      <img
        className="w-full h-full"
        src={IMAGES.LOGO.PATH}
        alt={IMAGES.LOGO.ALT}
      />
    </Button>
  );
};

export default ScrollLogoButton;
