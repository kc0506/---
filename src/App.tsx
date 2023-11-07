import { useEffect, useMemo, useRef, useState } from 'react'


type Title = 'body' | 'lung1' | 'lung2' | 'coronal' | 'saggital';
const IMG_COUNT_MAP: Record<Title, number> =
  { 'body': 73, 'lung1': 34, 'lung2': 66, 'coronal': 40, 'saggital': 63 };

const PERCENT_OF_IMG = 5;  // 5% for an image


type ImagesContainerProps = {
  title: Title,
  imgNum: number,
}
function ImagesContainer(props: ImagesContainerProps) {

  const { title, imgNum } = props;

  const loadedImg = useRef(0);

  const imgsCount = IMG_COUNT_MAP[title];
  const imgComponents = useMemo(() => {

    const arr = [];
    for (let i = 0; i < imgsCount; i++) {

      const img = new Image();
      img.src = getImagePath(title, i + 1).toString();
      img.onload = () => {
        loadedImg.current++;

        console.log(loadedImg);
        if (loadedImg.current === imgsCount) {
          document.title = 'loaded!';
        } else {
          document.title = 'loading';
        }
      }
      const ele = (<div
        style={{
          backgroundImage: `url(${getImagePath(title, i + 1)})`,
          height: '100%',
          width: 500,
          backgroundPosition: "140% 97%",
          backgroundSize: "110%",
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: i === imgNum ? 1 : 0,
        }}
      >
      </div >)
      arr.push(ele)
    };

    return arr;
  }, [title, imgNum]);

  return (
    <div style={{
      width: '100%',
      height: '420px',
      position: 'absolute',
      top: 0,
      left: 0,
    }}>
      {...imgComponents}
    </div>
  )
}

type ComponentProps = {
  title: Title,
};
function Component(props: ComponentProps) {
  const parentRef = useRef<HTMLDivElement>(null!)
  const scrollContainerRef = useRef<HTMLDivElement>(null!)

  const { title } = props;

  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {

    function hideScrollBar() {
      const diff = parentRef.current.clientWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.style.transform = `translate(${diff}px, 0)`;
      parentRef.current.style.transform = `translate(-${diff / 2}px, 0)`;
    }
    hideScrollBar();

    document.addEventListener('resize', hideScrollBar)
    return () => document.removeEventListener('resize', hideScrollBar)
  }, [parentRef, scrollContainerRef])


  useEffect(() => {
    function handler(e: Event) {
      console.log("handle")
      const ele = e.target as HTMLDivElement;

      const percent = ele.scrollTop / ele.clientHeight;
      console.log(percent);
      setImgNum(Math.floor(percent * 100 / PERCENT_OF_IMG));
    }
    scrollContainerRef.current.addEventListener('scroll', handler)
    return () => scrollContainerRef.current.removeEventListener('scroll', handler);
  }, [])


  const imgsCount = IMG_COUNT_MAP[title];
  const heightPercent = PERCENT_OF_IMG * imgsCount + 100;
  console.log(imgsCount, heightPercent)


  return (
    <div ref={parentRef} style={{ overflow: 'hidden' }}>
      <ImagesContainer imgNum={imgNum} title={title} />
      <div ref={scrollContainerRef} style={{
        overflowY: "scroll",
        overflowX: 'hidden',
        // isolation: 'isolate',
        // backgroundImage: `url(${getImagePath(title, imgNum + 1)})`,
        height: 420,
        width: 500,
        backgroundPosition: "140% 97%",
        backgroundSize: "110%",
        position: 'relative',
      }}>
        <div style={{
          height: `${heightPercent}%`,
          backgroundImage: "linear-gradient(#e66465, #9198e5)",
          opacity: 0,
        }}>I</div>
      </div>
    </div >
  )
}

function getImagePath(title: string, num: number) {
  return new URL(`./images/${title}/img${num}.jpg`, import.meta.url);
}

function App() {
  return <div className='container'>
    <Component
      title='body'
    />
  </div>
}

export default App
