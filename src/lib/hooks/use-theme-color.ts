import { useEffect } from 'react';

function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r} ${g} ${b}`;
}

export function useThemeColor(color: string) {
  useEffect(() => {
    const rgbColor = hexToRGB(color);

    document.documentElement.style.setProperty('--color-brand', rgbColor);
    if (document.getElementsByClassName("MyElement")) {
      // console.log(document.getElementsByClassName("MyElement").);
      // console.log(document.getElementsByClassName("MyElement").length);
      let els = document.getElementsByClassName("MyElement");
      let l = els.length;
      for(let i=0; i<l; i++){
        // console.log(els[i].classList)
        if (!els[i].classList.contains("bg-gradient-to-r")) {els[i].className += color}
      }
      // document.getElementsByClassName("MyElement").map(ele => {
      //   if (ele.classList.contains("bg-gradient-to-r")) {
      //     ele.className += color
      // }})
      // if (!document.getElementsByClassName("MyElement").classList.contains("bg-gradient-to-r")) {document.getElementsByClassName("MyElement").className += color}
    };
  }, [color]);
}
