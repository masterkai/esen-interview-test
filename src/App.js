import './App.scss';
import React, {useEffect, useRef, useState} from "react";

function App() {
  const [content, setContent] = useState([])
  const [scrollTop, setScrollTop] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('')
  const [compareData, setCompareData] = useState([])
  const headerRef = useRef()
  const myRef = useRef()
  const itemRef = useRef()

  function compare() {
    compareData.forEach((item) => {
      if (scrollTop > item.pos - headerRef.current.offsetHeight * 2) {
        setCurrentTitle(item.text)
      }
    })
  }

  const onScroll = () => {
    compare()
    const myScrollTop = myRef.current.scrollTop
    setScrollTop(myScrollTop)
  }

  const scrollToRef = (pos) => {
    myRef.current.scrollTo(0, pos)
  }

  function getItemElements() {
    const arr = []
    const items = document.querySelectorAll('.contentBox .item')
    items.forEach(item => arr.push({pos: item.offsetTop, text: item.children[0].textContent}))
    return arr
  }

  function getData(url) {
    return fetch(url)
      .then(resp => {
        if (!resp.ok) {
          throw Error("There was a problem fetching data.");
        }
        return resp.json();
      });
  }

  window.addEventListener('click', (e) => {
    if (e.target.className === 'menuBtn') {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }
  })

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const arr = getItemElements()
      setCompareData(arr)
      const text = arr.length > 0 ? arr[0].text : ''
      setCurrentTitle(text)
    }, 1500)

    return () => clearTimeout(timeOut)
  }, [content])

  useEffect(() => {
    getData('http://localhost:3005/content')
      .then(data => {
        setContent(data)

      })
  }, [])

  return (
    <>
      <div className="outerBox">
        <div
          ref={headerRef}
          className="navigationBar">
          <div className="detector">
            <div className='currentTitle'>{currentTitle}</div>
            <div
              className="menuBtn"
            >目錄
            </div>
          </div>
          <div
            style={{display: showMenu ? 'block' : 'none'}}
            className="menu"
          >
            {content && content.map((item, index) => (
              <div
                className="menuItem"
                key={index}
                onClick={() => scrollToRef(compareData[index].pos)}
              >
                <div className='chapter'>第{item.chapter}章</div>
                <div className='title'>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={myRef}
          className="contentBox"
          onScroll={onScroll}
        >
          {content && content.map(c => (
            <div
              ref={itemRef}
              key={c.title} className="item">
              <h3 className='title'>{c.title}</h3>
              <div dangerouslySetInnerHTML={{__html: c.richText}}>

              </div>
            </div>
          ))}

        </div>
        <div className="inputBox">
          <input className="saySomething" type="text"/>
          <button className="btn">Send</button>
        </div>
      </div>

    </>
  );
}

export default App;
