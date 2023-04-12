import { toast } from 'react-toastify';

const commonHelper = {
  scrollToUp: (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },
  notification: (text: string) => toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500,
  }),
};

export {
  commonHelper,
};
