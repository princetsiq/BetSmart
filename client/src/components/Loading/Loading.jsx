import React from 'react';
import './Loading.scss';

// const getClassNames = ({ size, thickness }) => {
//   let classes = "";
//   switch (size) {
//     case "xsmall":
//       classes += "loading-xsmall ";
//       break;
//     case "small":
//       classes += "loading-small ";
//       break;
//     case "medium":
//       classes += "loading-medium ";
//       break;
//     case "large":
//       classes += "loading-large ";
//       break;
//     default:
//       break;
//   }
//   switch (thickness) {
//     case "thin":
//       classes += "loading-thin";
//       break;
//     case "thicc":
//       classes += "loading-thicc";
//       break;
//     case "extra-thicc":
//       classes += "loading-extra-thicc";
//       break;
//     default:
//       break;
//   }
//   return classes;
// }

// const Loading = (props) => {
//   const classNames = getClassNames(props);
//   return <div className={`loading ${classNames}`}></div>;
// }

// export default Loading;

const Loading = () => {
  return (
    <div className="loading-bubbles">
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
    </div>
  );
};

export default Loading;