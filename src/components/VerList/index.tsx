import React, { useState, useEffect, useRef, useCallback } from "react"

// 模拟大量数据
const data = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

// 列表项组件
const ListItem = React.memo(({ item, style }: any) => {
  return <div style={style}>{item}</div>
})

// 主组件
const VirtualList = () => {
  const containerRef = useRef<any>(null)
  const [visibleItems, setVisibleItems] = useState<any>([])
  const itemHeight = 35 // 每个列表项的高度
  const buffer = 5 // 缓冲区列表项数量
  const renderedItemsRef = useRef<any>({})

  const handleScroll = useCallback(() => {
    console.log(111)
    const container = containerRef.current
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
    const endIndex = Math.min(
      data.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer
    )

    const newVisibleItems = []

    for (let i = startIndex; i < endIndex; i++) {
      if (!renderedItemsRef.current[i]) {
        renderedItemsRef.current[i] = {
          item: data[i],
          style: {
            position: "absolute",
            top: i * itemHeight,
            left: 0,
            right: 0,
            height: itemHeight,
          },
        }
      }
      newVisibleItems.push(renderedItemsRef.current[i])
    }
    setVisibleItems(newVisibleItems)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    container.addEventListener("scroll", handleScroll)
    handleScroll() // 初始化时调用一次

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      ref={containerRef}
      style={{
        height: "400px",
        width: 400,
        overflowY: "auto",
        position: "relative",
        border: "1px solid red",
      }}
    >
      <div
        style={{
          height: `${data.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map(({ item, style }: any) => (
          <ListItem key={item} item={item} style={style} />
        ))}
      </div>
    </div>
  )
}

export default VirtualList
