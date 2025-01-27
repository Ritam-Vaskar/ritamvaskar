function slideInFromLeft(delay) {
    return {
      hidden: { x: -100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
          duration: 0.5,
        },
      },
    };
  }
  
  function slideInFromRight(delay) {
    return {
      hidden: { x: 100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
          duration: 0.5,
        },
      },
    };
  }
  
  function slideInFromTop(delay) {
    return{
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
    }
  };
  
  module.exports = { slideInFromLeft, slideInFromRight, slideInFromTop };
  